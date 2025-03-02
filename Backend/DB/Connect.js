const mongoose = require('mongoose');

module.exports = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
    }
} ;