require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const cookieParser=require("cookie-parser")
const PORT=process.env.PORT || 5000
const app= express();
const userRoute=require("./routes/userRoute")
const paymentRoute=require("./routes/paymentRoute")

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(
    cors({
        origin:["http://localhost:3000","https://trendify-hub777.vercel.app"],
        methods:["POST", "GET", "PUT", "DELETE"],
        credentials:true,
    })
)
//errorhandling
const errorHandler=require("./middleware/errorMiddleware")
app.use(errorHandler);

//Routes
app.get("/",(req,res)=>{
    res.send("homepage")
})
app.use("/api/users",userRoute);
app.use("/api/users",paymentRoute);

//connect to the database
const dbConnect=require("./config/database");
dbConnect();

app.listen(PORT,()=>{
    console.log("app run at 5000");
})
     
// var express = require('express');
// var cors = require('cors');
// var app = express();

// app.use(cors());

// // your routes here

// app.listen(3000, function () {
//  console.log('CORS-enabled web server listening on port 3000');
// });
