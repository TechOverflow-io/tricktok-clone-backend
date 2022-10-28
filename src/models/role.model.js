const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        unique:true
    },
    permissionId:{
        type:[mongoose.Types.ObjectId],
        default:[ObjectId('6329e39b77b4683e83e97670')],
        ref: 'permissions'
    },
    isActive:{              // 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }
   
}, { timestamps: true })



module.exports = mongoose.model('role', roleSchema);
