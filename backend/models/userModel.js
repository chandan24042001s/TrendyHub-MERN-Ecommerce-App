const mongoose=require("mongoose")
const {objectId}=mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please add a note"]
        },
        email:{
            type:String,
            required:[true,"please add a email"],
            unique:true,
            trim:true,
           
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{
            type:String,
            required:[true,"Please add apassword"],
            minLength:[6,"Password must be upto 6 characters"],
        },
        role:{
            type:String,
            required:[true,"plase specify a role : admin or customer"],
            default:"customer",
            email:["customer","admin"],
        },
        photo:{
            type:String,
            required:[true,"please add a photo"],
            default:"https://avatars.githubusercontent.com/u/85206406?v=4"
        },
        phone:{
            type:String,
            default:"+91"
        },
        address:{
            type:'object',
            //address,state,country
        }
    }
)



//Hash Password for Encryption before saving to DB
userSchema.pre("save",async function(next){
    const bcrypt=require("bcryptjs")
    if(!this.isModified("password")){
        return next();
    }
    //Hash Password
    const hashed=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(this.password,hashed)
    this.password=hashPassword
    next();
})


const User=mongoose.model('User',userSchema);
module.exports=User;