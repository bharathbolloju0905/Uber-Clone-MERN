const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const blacklistModel = require('../models/blacklist.token');
const {sendMessageToSocket} = require("../socket");
const rideModel = require("../models/ride.model") ;

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password, phone, vehicle } = req.body;
        const isexist = await captainModel.findOne({ email });
        if (isexist) {
            return res.status(400).json({ errors: [{ msg: "Email already exists" }] });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const captain = await captainModel.create({
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname,
            },
            email,
            password: hash,
            phone,
            vehicle:{
                color:vehicle.color,
                plate:vehicle.plate,
                type:vehicle.type,
                capacity:vehicle.capacity,
            },
        });

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
        captain.password = undefined;
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ msg: "Captain registered successfully" ,captain,token
        });
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

module.exports.loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        captain.password = undefined;
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME});
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ msg: "Captain logged in successfully",captain,token });
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

module.exports.getProfile = async (req, res) => {   
    try {
        const captain = await captainModel.findById(req.captain.id);
        res.status(200).json(captain);
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}
module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        await blacklistModel.create({ token : token });
        res.clearCookie('token');
        res.status(200).json({ msg: "Captain logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

module.exports.acceptRide = async (req, res) => {
    try {
        const newRide = req.body; // Extract ride details from the request body
        console.log("Received newRide details:", newRide);

        const captainId = req.captain.id; // Extract captain ID from the authenticated captain
        const rideId = newRide._id; // Extract ride ID from the request body

        if (!rideId) {
            return res.status(400).json({ message: "Ride ID is required" });
        }

        // Update the ride with the captain ID and status
        const ride = await rideModel.findByIdAndUpdate(
            rideId,
            {
                $set: {
                    status: "Accepted",
                    captainId: captainId,
                },
            },
            { new: true } // Return the updated document
        )   .select('+otp')
            .populate("userId") // Populate user details
            .populate("captainId"); // Populate captain details

            console.log(ride)

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Notify the user about the accepted ride
        const event = "ride-accepted";
        const message = ride;
        const socketId = ride.userId?.socketId; // Ensure userId and socketId exist
        
        if (socketId) {
            sendMessageToSocket({ socketId, event, message });
            return res.status(201).json({ message: "Ride accepted successfully", ride });
        } else {
            console.log("User socketId not found, unable to send notification.");
            return res.status(500).json({message: "Ride accepted, but unable to notify user."});
        }

    } catch (err) {
        console.error("Error in acceptRide:", err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


module.exports.startingRide = async (req, res) => {
    try {
        const { newRide, otp } = req.body;
        console.log(otp, "otp in starting ride")

        if (!newRide || !otp) {
            return res.status(400).json({ error: "OTP and ride details are required" });
        }

        const ride = await rideModel.findById(newRide._id).select("+otp");
        console.log(ride.otp,"actual value")

        if (!ride) {
            return res.status(404).json({ error: "Ride not found" });
        }
          
        if (String(otp) === String(ride.otp)) {
            const updatedRide = await rideModel.findByIdAndUpdate(
                newRide._id,
                { status: "ongoing" },
                { new: true }
            ).populate("userId captainId")
            return res.status(200).json({ message: "Ride started successfully", ride: updatedRide });
        } else {
            return res.status(400).json({ error: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error in startingRide:", err.message);
        return res.status(500).json({ error: "Unable to start ride", details: err.message });
    }
};

module.exports.endingRide = async (req, res) => {
    try {
        const { ride } = req.body;
        console.log(ride,"ride id in ending ride")
        const rideId = ride._id ;
        if (!rideId) {
            return res.status(400).json({ error: "Ride ID is required" });
        }

        const updatedRide = await rideModel.findByIdAndUpdate(
            rideId,
            { status: "completed" },
            { new: true }
        ).populate("userId captainId");

        if (!updatedRide) {
            return res.status(404).json({ error: "Ride not found" });
        }
        const event = "ride-completed" ;
        const message = updatedRide ;
        const socketId = updatedRide.userId?.socketId; // Ensure userId and socketId exist
        if (socketId) {
            sendMessageToSocket({ socketId, event, message });
        } else {
            console.log("User socketId not found, unable to send notification.");
        }

        return res.status(200).json({ message: "Ride ended successfully", ride: updatedRide });
    } catch (err) {
        console.error("Error in endingRide:", err.message);
        return res.status(500).json({ error: "Unable to end ride", details: err.message });
    }
};