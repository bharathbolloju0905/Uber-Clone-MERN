const express = require("express")
const router = express.Router()
const authmiddleware = require("../middlewares/user.auth.middleware")
const rideController = require("../controllers/ride.controller")

router.post("/create",authmiddleware.authenticate, rideController.createRide) ;
router.get("/getdetails/:rideid",authmiddleware.authenticate, rideController.getRideDetails) ;



module.exports = router ;