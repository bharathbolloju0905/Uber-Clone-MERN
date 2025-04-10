const mongoose = require("mongoose")
const captainSchema =  mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLenght:3,
        },
        lastname:{
            type:String,
            minLenght:3,
        },

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLenght:6,
        select:false,
    },
    phone:{
        type:String,
        required:true,
    },
    location:{
       
        lng:{
            type:Number, 
        },
        ltd:{
            type:Number,
        },
    },
    vehicle:{
        color:{
            type:String,
            required:true,
        },
        plate:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        },
        capacity:{
            type:Number,
            required:true,
        },
    },
    status:{
        type:String, 
        enum:['active','inactive'],
        default:'inactive',
    },
    socketId:{
        type:String ,
    }
});

module.exports = mongoose.model("Captain",captainSchema);