const User = require('../../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function isLoggedIn(req){
    // console.log(req.cookies)
    // if(req.headers?.authorization) {
    if(req.cookies?.user_id){
        return req.cookies.user_id
    }
    // return !!req.cookies?.user_id;
    return false;

}

module.exports.login=async (req,res,next)=> {
 try{
   const checkToken = await isLoggedIn(req)
     if(!checkToken) {
         const userEmail = await User.findOne({email: req.body.email});
         // console.log(userEmail)
         if (userEmail) {
             const user = await bcrypt.compare(req.body.password, userEmail.password)
             // console.log(user)
             if (userEmail.isActive === 1 && user) {
                 // res.cookie("user_id", userEmail._id, {maxAge: 3600000});
                 const token = await jwt.sign({ "user_id" : userEmail._id},
                     process.env.JWT_SECRET_TOKEN,
                     {
                         expiresIn: '1h'
                     })
                 res.cookie("user_id", token, {maxAge: 3600000});

                 res.status(200).json({
                     message: "User Found",
                     data: userEmail,
                     validate:true,
                     token
                 })
                 next()
             }
             else {
                 res.status(403).json({
                     message: "Incorrect Email Or Password",
                     validate:false

                 })
             }
         }else {
             res.status(403).json({
                 message: "Incorrect Email Or Password",
                 validate:false

             })
         }

     }else{
         res.status(200).json({
             message:'Already Logged In'
         })
         next()
     }
}catch (e) {
     console.log('Error ', e);
     res.status(501).json({
         message: 'Internal Server Error'
     })
 }
}


module.exports.getUser=async (req,res,next)=>{
    try{
        const checkToken = await isLoggedIn(req);
        if(!checkToken){
            res.status(403).json({
                message: "Login Again",
                isLoggedIn:false
            })
        }
        else {
           jwt.verify(checkToken, process.env.JWT_SECRET_TOKEN,function (err, decoded){
                if (err) {
                    res.status(500).json({
                        message: 'Token Expired Please Login Again',
                        isLoggedIn:false

                    })
                }
                else{
                    req.user_id = decoded.user_id
                    next()
                }
            })
        }
    }catch (e){
        console.log('Error ', e);
        res.status(501).json({
            message: 'Internal Server Error'
        })
    }
}


module.exports.logout=async (req,res,next)=>{
    const checkToken = await isLoggedIn(req);
    if (!checkToken){
        res.status(403).json({
            message: "Login Again",
            isLoggedIn:false
        })
    }
    else {
        res.clearCookie("user_id");
        res.status(200).json({
            message: "Logout Successfully"
        })
    }
}
