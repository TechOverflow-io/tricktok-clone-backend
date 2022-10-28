const Role = require('../../../models/role.model');
const User = require('../../../models/user.model');
const mongoose= require('mongoose')

module.exports.getRoles=async (req,res,next)=>{
    try{
        const user = await User.findById(req.user_id)
        console.log(user)
        const userRoles = await Role.findById(user.roleId)
        if(userRoles) {
            res.status(200).json({
                message: 'Found',
                data: userRoles
            })
            return userRoles.role
        }
        else{
            res.status(200).json({
                message: 'No Record Found',
                data: null
            })
        }
    }catch (e) {
        console.log('Error',e)
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.assignRole=async (req,res,next)=>{
try{
    const findUser = await User.findByIdAndUpdate(req.params.id,req.body);
    if(findUser){
        const user = await User.findById(req.params.id)
        res.status(200).json({
            message: "Role Assigned Successfully",
            data: user
        })
    }
    else{
        res.status(404).json({
            message: "No User Found",
            data: null
        })
    }
}catch (err) {
    console.log('Error', err.message);
    res.status(500).json({
        message: 'Internal Server Error',
        error:err
    })
}
}