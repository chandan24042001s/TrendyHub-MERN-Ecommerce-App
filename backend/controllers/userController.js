const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be upto 6 character");
  }

  const User = require("../models/userModel");
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already Registered");
  }

  //Create new User
  const user = await User.create({
    name,
    email,
    password,
  });

  //Generate Token for User
  if (user) {
    const { _id, name, email, role } = User;
    const token = generateToken(_id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      // secure:true,  for deployment
      // sameSite:none
    });
    // send user data
    res.status(201).json({
      success: true,
      data: _id,
      name,
      email,
      role,
      token,
      message: "regisered successfully",
    });
  } else {
    res.status(400).json({error:"Invalid user Data"});
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("please add email & password");
  }

  //check if user Exists
  const user = await User.findOne({ email });
  //userexists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if(!user){
    res.status(400)
    throw new Error("user doesnot exist")
  }

  //generate token for new user
  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser=await User.findOne({email}).select("-password")
    res.cookie("token",token,{
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now()+1000*86400),
        // secure:true,
        // sameSite:none,
    });
    //send user data
    res.status(201).json(newUser)
  }else{
    res.status(400);
    throw new Error("Invalid email or Password");
  }
});


//logout user
const logOut=asyncHandler(async(req,res)=>{
    res.cookie("token"," ",{
        path:"/",
        httpOnly:true,
        expires:new Date(0),
        // secure:true,
        // sameSite:none,
    });
    return res.status(200).json({
        message:"successfully logout"
    })
})


const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-password")
    if(!user){
        res.status(400)
        throw new Error("User not Found")
    }
    res.status(200).json(user)
})

//get login status of User
const loginStatus=asyncHandler(async(req,res)=>{
    const token=req.cookies.token;
       if(!token){
        res.json(false)
        
       }
       //verify token
       const verified=jwt.verify(token,process.env.JWT_SECRET)
       if(verified){
        res.json(true)
       }
       res.json(false)

})

//update user
const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(user){
        const {name,phone,address}=user;
        user.name=req.body.name || name;
        user.phone=req.body.phone || phone;
        user.address=req.body.address || address;
        const updateuser=await user.save()
        res.status(200).json(updateuser)
    }else{
        res.status(404);
        throw new Error("user not found");
    }
})

//update photo
const updatePhoto=asyncHandler(async(req,res)=>{
    const {photo}=req.body;
    const user=await User.findById(req.user._id);

        
        user.photo=photo
        
        const updateuser=await user.save()
        res.status(200).json(updateuser)
})


module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUser,
  loginStatus,
  updateUser,
  updatePhoto
};
