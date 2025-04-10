const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const authController = require("../controllers/captain.auth.controllers");
const authmiddleware = require("../middlewares/captain.auth.middleware");

router.post("/register", [body("fullname.firstname").isLength({ min: 3 }).withMessage("First name should be greater than 3 characters"), body("email").isEmail().withMessage("Email is not valid"), body("password").isLength({ min: 6 }).withMessage("Password should be greater than 6 characters"), body("confirmPassword").custom((value, { req }) => { if (value !== req.body.password) { throw new Error("Password does not match"); } return true; }), body("phone").isLength({ min: 10 }).withMessage("Phone number should be greater than 10 characters"), body("vehicle.color").isLength({ min: 3 }).withMessage("Color should be greater than 3 characters"), body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate should be greater than 3 characters"), body("vehicle.type").isIn(['car', 'motorcycle', 'auto']).withMessage("Vehicle type should be car, motorcycle or auto"), body("vehicle.capacity").isNumeric().withMessage("Capacity should be a number")], authController.registerCaptain);


router.post("/login", [body("email").isEmail().withMessage("Email is not valid"), body("password").isLength({ min: 6 }).withMessage("Password should be greater than 6 characters")], authController.loginCaptain);

router.get("/profile",authmiddleware.authenticatedCaptain,authController.getProfile);

router.post("/accept-ride",authmiddleware.authenticatedCaptain, authController.acceptRide) ;

router.post("/starting-ride",authmiddleware.authenticatedCaptain, authController.startingRide) ;
router.post("/ending-ride",authmiddleware.authenticatedCaptain, authController.endingRide) ;



router.get("/logout",authController.logoutCaptain);


module.exports = router;