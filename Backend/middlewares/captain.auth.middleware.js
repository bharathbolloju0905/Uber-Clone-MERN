const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistModel = require('../models/blacklist.token');



module.exports.authenticatedCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }
        req.captain = captain;
        next();
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

