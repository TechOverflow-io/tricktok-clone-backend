const Role = require('../models/role.model')
const mongoose = require('mongoose')

module.exports.createRole=async (req,res,next)=>{
    try{
        // let role;
        // if(req.body.permissionId) {
        //     let data = req.body.permissionId.length > 1 ? req.body.permissionId.split(',') : req.body.permissionId
        //
        //     let objectIdArray = data.map(s => mongoose.Types.ObjectId(s))
        //     role = await Role.create({role: req.body.role, permissionId: objectIdArray})
        // }else{
            const role = await Role.create(req.body)
        // }

        res.status(201).json({
            message:'Role Created Successfully',
            data: role
        })
    }catch(err){
        console.log('Error', err);
        res.status(501).json({
            message:'Internal Server Error',
            error:err.message
        })
    }
}

module.exports.allRoles=async (req,res,next)=>{
    try {
        const roles = await Role.find();
        if(roles.length>0){
            res.status(200).json({
                message: 'found',
                data: roles
            })
        }
        else {
            res.status(200).json({
                message: 'No Record Found',
                data: []
            })
        }
    }catch (e){
        console.log('Error ', e);
        res.status(400).json({
            message: 'error',
        })
    }
}

module.exports.updateRole=async (req,res,next)=>{
    try {
        const id = req.params.id;
        const updateRole = await Role.findByIdAndUpdate(id,req.body)
        if (updateRole){
            res.status(200).json({
                message: 'Updated Successfully',
                data:updateRole
            })
        }
        else{
            res.status(404).json({
                message: 'No Record Found',
                data: []
            })
        }
    }catch (e) {
        console.log('Error ', e)
        res.status(501).json({
            message: "Error Occurred"
        })
    }
}

module.exports.deleteRole=async (req,res,next)=>{
    try {
        const id = req.params.id;
        const updateRole = await Role.findByIdAndUpdate(id, {isActive:0})
        if (updateRole){
            res.status(200).json({
                message: 'Deleted Successfully',
                data:updateRole
            })
        }
        else{
            res.status(404).json({
                message: 'No Record Found',
                data: []
            })
        }
    }catch (e) {
        console.log('Error ', e)
        res.status(501).json({
            message: "Error Occurred"
        })
    }
}


module.exports.changePermissionStatus=async (req,res,next)=>{
    try{
        const id = req.params.id;
        const changeStatus = await Role.findByIdAndUpdate(id, {isActive: req.body.status})
        if(changeStatus) {
            const showStatus = await Role.findById(id)
            res.status(200).json({
                message: "Role Status Updated",
                data: showStatus
            })
        }
        else{
            res.status(404).json({
                message: 'No Record Found',
                data: []
            })
        }
    }catch (e) {
        console.log('Error ', e)
        res.status(501).json({
            message: "Error Occurred"
        })

    }
}