import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookie } from "../utils/cookies.js";
export const isAuthenticated= async (req,res,next)=>{
    
  console.log('Cookies: ', req.cookies)

  const {token}=req.cookies;
  console.log(token)
  if(!token) return res.status(404).json({
      success:false,
      message:"login first"
  })
  const decoded = jwt.verify(token,'afadakjdakj')
  req.user =await User.findById(decoded._id);
  next()

}