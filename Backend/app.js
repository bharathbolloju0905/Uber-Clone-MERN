const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const userRouter = require("./Routes/user.routes");
const captainRouter = require("./Routes/captain.route");
const mapRouter = require("./Routes/map.route");
const rideRouter = require("./Routes/ride.route");
const cookieParser = require("cookie-parser")
const cors = require("cors");


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/users",userRouter);
app.use("/captains",captainRouter);
app.use("/maps",mapRouter);
app.use("/rides",rideRouter) ;

module.exports = app ;