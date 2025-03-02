const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const userRouter = require("./Routes/user.routes")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/users",userRouter);



module.exports = app ;