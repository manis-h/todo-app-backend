import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import express from "express";
import mongoose from "mongoose";
import { db } from "./database.js";
import User from "./models/user.js";
import router from "./routes/user.js";
import taskrouter from "./routes/task.js";
import cors from  "cors";
const app =express();
// using middleware

app.use(cookieParser())
app.use(cors({
    origin:'http://127.0.0.1:5174',
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    
    secure:true
}))

app.use(express.json())
app.use(router)
app.use("/task",taskrouter)
db()
app.get("/",(req,res)=>{
    res.send("Server is working ")
    console.log('Cookies: ', req.cookies)

}
)
app.listen(4000)
