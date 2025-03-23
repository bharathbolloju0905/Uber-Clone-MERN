const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const userAuthMiddleware = require('../middlewares/user.auth.middleware');

router.get("/get-corrdinates",userAuthMiddleware.authenticate, mapController.getCoordinates);
router.get("/get-distance",userAuthMiddleware.authenticate, mapController.getDistance);   
router.get("/get-suggestions",userAuthMiddleware.authenticate, mapController.getSuggestions);   
router.get("/get-fare",userAuthMiddleware.authenticate, mapController.getFare);   



module.exports = router;