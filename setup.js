const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/admindata",{
    useNewUrlParser:true,
    autoIndex:true
}).then(()=> {
    console.log("connected")
}).catch(() => {
    console.log("not connceted")
})