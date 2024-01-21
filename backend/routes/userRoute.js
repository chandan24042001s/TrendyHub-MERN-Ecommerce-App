const express=require("express")
const router=express.Router();
const {registerUser, loginUser, logOut, getUser, loginStatus, updateUser, updatePhoto}=require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",logOut)
router.get("/getUser",protect,getUser)
router.patch("/loginStatus", protect, loginStatus)
router.post("/updateuser", protect, updateUser)
router.post("/updatePhoto",protect,updatePhoto)


module.exports=router;
