const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const User = require("../models/userModel");

const protect=asyncHandler(async(req,res,next)=>{
    try{
        const token=req.cookies.token;
       if(!token){
        res.status(401)
        throw new Error("Not Authorized, please Login");

       }
       //verify token
       const verified=jwt.verify(token,process.env.JWT_SECRET)

       //get userid from token
       const user=await User.findById(verified.id).select("-password")
       req.user=user
       next()
    }catch(err){

    }
})

module.exports={protect}