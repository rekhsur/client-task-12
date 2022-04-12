
const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const port = process.env.port||4000
const app = express()
require("./db/setup")
const adRouter = require("./router/adminrouter")


//add middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json())
app.use(adRouter)


app.listen(port, () => {
    console.log(`server is runing ${port}`)
})
