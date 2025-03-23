const ridemodel = require('../models/ride.model');
const mapServices = require('../services/map.services');
const crypto = require('crypto');


 
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
    // let fare = await calculateFare({pickup, destination, vehicleType})
    // console.log("returned value",fare)
    // fare = Math.round(fare)
    // console.log("fair and lovely",fare)
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
    res.status(201).json({ride});
}


