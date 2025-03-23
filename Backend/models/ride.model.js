const mongoose = require("mongoose")
const RideSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    vehicleType:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true 
    },
    status:{
        type: String,
        enum: ["Pending", "Accepted", "Ongoing","Cancelled", "Completed"],
        default: "Pending"
    },
    date:{
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
    },
    distance:{
        type: Number,
    },
    otp:{
        type: Number,
        required: true,
        select:false 
    },
    paymentId:{
        type: String,
    }

}) ;

module.exports = mongoose.model("Ride", RideSchema) ;