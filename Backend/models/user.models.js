const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLenght:3,
        },
        lastname:{
            type:String,
            minLenght:3,
        }
    },
   
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
}) ;
module.exports = mongoose.model('User',userSchema) ;