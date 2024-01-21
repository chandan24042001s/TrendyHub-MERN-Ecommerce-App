const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.status:500;
    res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV==="development"?err.stack:null
    })
}

module.exports=errorHandler