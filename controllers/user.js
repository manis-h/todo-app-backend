import User from "../models/user.js"
import cookieParser from "cookie-parser"
import router from "../routes/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { setCookie } from "../utils/cookies.js"
// import User from "../models/user.js"
export const getAllusers =
    async (req, res) => {
        const users = await User.find({})

        res.json({
            success: true,
            users,
        })
    }

export const register = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    let user = await User.findOne({email})
    if(user) return res.status(404).json({
        success:false,
        message:"user already exists"
    })
    const hashedPassword = await bcrypt.hash(password,10)
    await User.create({
        name,
        email,
        password:hashedPassword 

    })
setCookie(User,res,"Registered Successsfuly",201)
}
export const login = async (req, res) => {
    const {
        
        email,
        password
    } = req.body
    let user = await User.findOne({email}).select("+password")
    if(!user) return res.status(404).json({
        success:false,
        message:"Invalid email or Password"
    })
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(404).json({
        success:false,
        message:"Invalid email or Password"
    })
    setCookie(user,res,`WELCOME ${user.name}`,201)

}




export const logout = async (req, res) => {
    res.status(200).cookie("token","",{expires: new Date( Date.now())}).json({
        success:true,
        user:req.user
    })
}




export const getmyProfile = async(req,res)=>{
    // const id ="myid"
    res.status(200).json({
        success:true,
        user:req.user,
    })
}
export const getUser = async (req, res) => {
    const { id } = req.params
    const users = await User.findById(id)

    res.json({
        success: true,
        users,
    })
}
export const updateUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    res.json({
        success: true,
        user,
        message: "successfully Updated"
    })
}
export const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    user.deleteOne()
    res.json({
        success: true,
        user,
        message: "Deleted Successfully"
    })
}
