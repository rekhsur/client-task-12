const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    companyName:{
        type:String,
        trim:true,
        required:true
    },
    companyCode:{
        type:String,
        trim:true,
        required:true
    },
    companyAddress:{
        type:String,
        trim:true,
        required:true
    },
})

const Company = mongoose.model("company", companySchema)
module.exports = Company

