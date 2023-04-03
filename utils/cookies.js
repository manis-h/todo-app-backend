import jwt from "jsonwebtoken"
export const setCookie=(user,res,message,statusCode=200)=>{
    console.log(user._id)
    const token =jwt.sign({_id:user._id},"afadakjdakj")
    res.status(statusCode).cookie("token",token,{
            httpOnly:true,
            maxAge:10*60*1000,
            sameSite:"lax",
            secure:false
    }).json({
        success: true,
        message
    }) 
}