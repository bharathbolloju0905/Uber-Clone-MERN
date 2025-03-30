const ridemodel = require('../models/ride.model');
const mapServices = require('../services/map.services');
const crypto = require('crypto');
const { sendMessageToSocket } = require('../socket');
const rideModel = require("../models/ride.model") ;



 
function generateOTP(num){
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
} 


async function calculateFare({pickup, destination, vehicleType}) {
    const distanceandTime = await mapServices.getDistance(pickup, destination);
 
 let fare;
 const baseFare = 2; // base fare in dollars
 const perKmRate = {
      auto: 1,
      car: 2,
      motorcycle: 0.5
 };
 const perMinuteRate = {
      auto: 0.2,
      car: 0.5,
      motorcycle: 0.1
 };
 
 const { distance, duration } = distanceandTime;
console.log(distance,duration)

 
 fare = baseFare + (((distance.value)/1000 )* perKmRate[vehicleType]) + (((duration.value)/60) * perMinuteRate[vehicleType]);
 console.log("fare:",fare)
 return fare;
 }  


function validateRide({pickup, destination, vehicleType}) {
    if(!pickup || !destination || !vehicleType){
        console.log("missing values")
        return false;
    }
    if(pickup.length<3 || destination.length<3){
        console.log("length is less")
        return false;
    }
    if(!['auto', 'car', 'bike'].includes(vehicleType)){
        console.log("include error")
        return false;
    }
    return true;
}


module.exports.createRide = async (req, res) => {
    const { pickup, destination, vehicleType,fare } = req.body;
    console.log("req.body",req.body)
    const validate = validateRide({pickup, destination, vehicleType});
    if(!validate){
        return res.status(404).json({message: "Invalid ridedetails"});
    }
    const userId = req.user.id;
    const otp = generateOTP(4);
    const ride = await ridemodel.create({
        userId,
        pickup,
        destination,
        vehicleType,
        fare,
        otp
    });
    console.log("Ride before populate:", ride);
    const populatedRide = await ride.populate('userId');
    console.log("Ride after populate:", populatedRide);
    res.status(201).json({ride});

    ride.otp = undefined;

    const {lat,lng} = await mapServices.getCoordinates(pickup);
    console.log("ltdAndlng:",lat,lng)
    const filteredCaptains = await mapServices.getnearbyCaptains(lat,lng,distance= 5);
    console.log("filteredCaptains",filteredCaptains)

   const event = "new-ride";
   const message = await ride.populate('userId');
    filteredCaptains.map(captain => {
        const socketId = captain.socketId ;
        sendMessageToSocket({socketId,event,message}) ;
    });
}

