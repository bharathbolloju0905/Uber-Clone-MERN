const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');
const BlacklistToken = require('../models/blacklist.token');

module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ errors: "Unauthorized" });
        }
        const blacklistedToken = await BlacklistToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ errors: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ errors: "User not found" });
        }
        req.user = user;
        next();
    } catch (errors) {
        return res.status(500).json({ errors: errors.message });
    }
}

