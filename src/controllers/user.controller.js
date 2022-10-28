const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");

module.exports.createUser=async (req,res,next)=>{
    try{
        // console.log('In Create')
        if(req.body?.roleId){
            // console.log('In IF')
            req.body.roleId = mongoose.Types.ObjectId(req.body.roleId)
        }
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = await User.create(req.body);
        // console.log(user)
        res.status(201).json({
            message:'User Created Successfully',
            data:user
        })
    }catch(err){
        console.log('Error', err.message);
        res.status(501).json({
            message:'Internal Server Error',
            data:err.message
        })
    }
}

module.exports.getUser=async (req,res,next)=>{
    try{
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        res.status(200).json({
            message:'Success',
            data:user
        })
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.updateUser=async (req,res,next)=>{
    try{
       const user_id = req.params.id;
        await User.findByIdAndUpdate(user_id,req.body)
        res.status(200).json({
            message:'Updated Successfully'
        })
        
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.deleteUser=async (req,res,next)=>{
    try{
        const user_id = req.params.id;
       const user = await User.findByIdAndUpdate(user_id,{isActive:3})
        if(user) {
            res.status(200).json({
                message: 'Successfully Deleted'
            })
        }else{
            res.status(404).json({
                message: 'Record Not Found',
                data: null
            })
        }
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error'
        })
    }
}

module.exports.editProfile=async (req,res,next)=>{
    try{
        if(req.body.roleId){
            req.body.roleId = mongoose.TYpes.ObjectId(req.body.roleId)
        }
        if(req.files){
            const {image}=req.files
            const path = `${__dirname}/../../public/images/` + image.name
            req.body.image=`${image.name}`
            await image.mv(path)
        }
        if(req.body?.password){
            const salt = await bcrypt.genSalt(12)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        await User.findByIdAndUpdate(req.user_id,req.body);
        const updateUser = await User.findById(req.user_id)
        res.status(200).json({
            message:'Success',
            data: updateUser
        })
    }catch (e) {
        console.log(e)
    }
}

module.exports.getAllUsers=async (req,res,next)=>{
try{
    const users = await User.find();
    if(users?.length>0){
        res.status(200).json({
            message: 'Found Successfully',
            data: users
        })
    }
}catch (err) {
    console.log('Error', err.message)
    res.status(501).json({
        message:'Internal Server Error',
        error:err.message
    })
}
}