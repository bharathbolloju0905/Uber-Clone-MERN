const express = require("express")
const router = express.Router()
const authmiddleware = require("../middlewares/user.auth.middleware")
const rideController = require("../controllers/ride.controller")

router.post("/create",authmiddleware.authenticate, rideController.createRide) ;



module.exports = router ;