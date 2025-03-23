const { Server } = require("socket.io");
const userModel = require("./models/user.models");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins, adjust as needed
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Listen for the "join" event
        socket.on("join", async ({ userId, typeOfUser }) => {
            try {
                if (typeOfUser === "user") {
                    // Update the socketId for the user
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User ${userId} joined with socket ID: ${socket.id}`);
                } else if (typeOfUser === "captain") {
                    // Update the socketId for the captain
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Captain ${userId} joined with socket ID: ${socket.id}`);
                } else {
                    console.error("Invalid typeOfUser");
                }
            } catch (error) {
                console.error("Error updating socket ID:", error.message);
            }
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocket(socketId, event, message) {
    if (io) {
        io.to(socketId).emit(event, message);
    } else {
        console.error("Socket.io is not initialized");
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocket
};