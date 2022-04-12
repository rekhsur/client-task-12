const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminRouter = require("../router/adminrouter")

const adminSchema = mongoose.Schema({
   adminname:{
        type:String,
        required:true,
        trim:true
    },
   companyCode:{
       type:String,
       required:true,
       trim:true,
   },
   password:{
       type:String,
       required:true,
       trim:true
   },
   tokens:[{
       token:{
           type:String,
           required:true,
       }
   }]

   
    
})


adminSchema.methods.generateToken = async function(){
    const admin = this
    const token = jwt.sign({_id:admin._id.toString()},process.env.JWT_SECRET)
    admin.tokens = admin.tokens.concat({
        token})
       await admin.save()
       return token
    
}

adminSchema.statics.findByCredentials = async(companyCode, password)=>{
    const admin = await Admin.findOne({
        Email:email
    })
    if(!user){
        throw Error("unable to find admin")
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!ismatch){
        throw Error("unable to login check companycode and password")
    }
    return admin
}



adminSchema.pre('save', async function(next){
    const admin = this
    if(admin.isModified("password")){
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin
