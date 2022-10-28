const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const contactSchema = mongoose.Schema({
    name: {
        type:String,
        maxLength: 10,
        required: [true, 'Username is required'],
        lowercase:true
    },
    phone_number:{
        type:String,
        unique: true,
        required: [true, 'Number is required'],
        lowercase:true
    },
    tags:{
        type:[{
            type:String,
            lowercase:true
        }],
    },
    user: {
        type: mongoose.Types.ObjectId,
        default: ObjectId('632a313914b1c23ec86c2a04'),
        ref: 'users',
    },
    isActive:{              // 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }
}, { timestamps: true })




module.exports = mongoose.model('contacts', contactSchema);
