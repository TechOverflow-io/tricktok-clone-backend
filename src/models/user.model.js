const mongoose = require('mongoose')
const {isEmail} = require('validator')
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    username: {
        type:String,
        unique: true,
        maxLength: 10,
        required: [true, 'Username is required'],
        lowercase:true
    },
    email:{
        type:String,
        unique: true,
        validate:[isEmail, 'Invalid Email'],
        required: [true, 'Email is required'],
        lowercase:true
    },
    password:{
        type:String,
        required: [true, 'Password is required']
    },
    image: {
      type:String,
        default: 'user.png'
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        default: ObjectId('632a313914b1c23ec86c2a04'),
        ref: 'role',
    },
    isActive:{              // 1:Active 2:Block 3:Deleted
        type: Number,
        default: 1,
    }
}, { timestamps: true })


// userSchema.pre('save',async (req,res,next)=>{
//     console.log(this)
//     // const salt = await bcrypt.genSalt(12);
//     // const hashPassword = await bcrypt.hash(password, salt);
//     // req.body.password = hashPassword;
//
// })

module.exports = mongoose.model('user', userSchema);
