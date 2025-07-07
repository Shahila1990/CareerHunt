const mongoose = require('mongoose');

const validateObjectId = (req,res,next) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400)
        throw new Error("Invalid Job Id");
        
    }
    next()
}

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
     res.status(statusCode)
     res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack 
     })
}


module.exports = {
    errorHandler,
    validateObjectId,
}