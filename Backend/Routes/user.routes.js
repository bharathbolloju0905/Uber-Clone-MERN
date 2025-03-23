const express = require("express")
const router = express.Router();
const { body } = require("express-validator")
const  authController  = require("../controllers/user.auth.controllers")
const  authenticate  = require("../middlewares/user.auth.middleware")

router.post("/register",
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name should be greater than 3 characters"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password should be greater than 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password does not match");
        }
        return true;
    }),
   authController.registerController
);

router.post("/login",
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password should be greater than 6 characters"),
   authController.loginController
);

router.get("/profile",authenticate.authenticate,authController.profileController);


router.get("/logout",authController.logoutController);
module.exports = router;