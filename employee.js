const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    employeeName:{
        type:String,
        required:true,
        trim:true,
    },
    employeeId:{
        type:String,
    required:true,
    trim:true,

    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
    }
})
const Employee = mongoose.model("employee", employeeSchema)
module.exports = Employee