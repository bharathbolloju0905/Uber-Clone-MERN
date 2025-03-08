const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const userRouter = require("./Routes/user.routes");
const captainRouter = require("./Routes/captain.route");
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/users",userRouter);
app.use("/captains",captainRouter);



module.exports = app ;