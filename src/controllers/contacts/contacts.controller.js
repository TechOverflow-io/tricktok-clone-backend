const Contact = require("../../models/contacts/contacts.model")


module.exports.createContact=async (req,res)=>{
    try {
        const newContact = await Contact.create(req.body);
        if (newContact) {
            res.status(201).json({
                message: 'User Created Successfully',
                data: newContact
            })
        }
        else
        {
            res.status(400).json({
                message: 'Bad Request'
            })
        }
    }catch(err) {
            res.status(501).json({
                message: 'Internal Server Error',
                data:err.message
            })
        }
}


module.exports.getAllContacts=async (req,res)=>{
    // const userId= req.user_id;
    try {
        const allContacts = await Contact.find();
        if (allContacts?.length > 0) {
            res.status(200).json({
                message: 'success',
                data: allNumbers
            })
        } else {
            res.status(200).json({
                message: 'No Record Found',
                data: []
            })
        }
    }catch(err) {
        res.status(501).json({
            message: 'Internal Server Error',
            data:err.message
        })
    }
}

module.exports.updateContact = async (req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        if(contact){
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body)
            res.status(203).json({
                message: 'success',
                data: updatedContact
            })
        }else {
            res.status(200).json({
                message: 'No Contact Found',
            })
        }
    }catch(err) {
        res.status(501).json({
            message: 'Internal Server Error',
            data:err.message
        })
    }
}

module.exports.deleteContact =async (req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        if(contact){
            await Contact.findByIdAndUpdate(req.params.id, {isActive:2})
            res.status(203).json({
                message: 'success',
            })
        }else {
            res.status(200).json({
                message: 'No Contact Found',
            })
        }

    }catch(err) {
        res.status(501).json({
            message: 'Internal Server Error',
            data:err.message
        })
    }
}