const mongoose = require("mongoose");

module.exports.connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true
    }).then(()=>{
        console.log('Database Connected');
    }).catch(err=>{
        console.log('Error ', err);
    })
}
