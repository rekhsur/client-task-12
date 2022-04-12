const express = require("express")
const adminRouter =  express.Router()
const Admin = require("../models/admin")
const Employee = require("../models/employee")
const Company = require("../models/company")
const auth = require("../middleware/adminmiddleware")

adminRouter.get("/admin", (req, res) => {
      res.send("welcome to adminpannel")
})
//signup and login for admin
adminRouter.post("/admin/signup", async(req, res) => {
      const admin = new Admin(req.body)
      try{
          await admin.save()
          res.status(201).send(admin)
      }catch(error) {
          res.status(404).send("badrequest")
      }
})

adminRouter.post("/admin/login", async(req, res) => {
    try{
        const admin = await Admin.findCredentials(req,body.companyCode, req.body.password)
        const token = await admin.generateToken()
        res.send({user, token})
    }catch(e){
        res.status(404).send("cannot find admin without information")
    }
})

// create employee information

adminRouter.post("/admin/createEmployee",auth, async(req, res) => {
    const employee = new Employee(req.body)
    try{
        await employee.save()
        res.status(201).send(employee)
    }catch(e) {
        res.status(404).send("badrequest")
    }
})

// update employee information

adminRouter.post("/admin/updatemployee",auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const updateOperation = ["employeeame","employeeCode","password","mobilenumber"]
    const isValidOperation = updates.every((operation)=>updateOperation.includes(operation))
    console.log(!isValidOperation)
    if(!isValidOperation){
        return res.status(404).send({error:"please provide valid path"})
    }
    try{
        updates .forEach((update) =>req.employee[update] = req.body[update])
        await req.employee.save()
        res.send(req.employee)
    }catch(e) {
        res.status(406).send(e)
    }

    
})

// create company profile by admin
adminRouter.post("/admin/createcmpanyProfile",auth, async(req, res) => {
    const company = new Company(req.body)
    try{
        await company.save()
        res.status(201).send(company)
    }catch(e) {
        res.status(404).send("badrequest")
            
    }   
    
})
//update Company profile by admin

adminRouter.post("/admin/updatecompany",auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const updateOperation = ["companyName","companyCode","companyAddress"]
    const isValidOperation = updates.every((operation)=>updateOperation.includes(operation))
    console.log(!isValidOperation)
    if(!isValidOperation){
        return res.status(404).send({error:"please provide valid path"})
    }
    try{
        updates .forEach((update) =>req.company[update] = req.body[update])
        await req.company.save()
        res.send(req.company)
    }catch(e) {
        res.status(406).send(e)
    }

    
})

  // get employee data by name , id, mobilenumber
  adminRouter.get("/admin/search/employeedata/:key",aut, async(req, rse) => {
                console.log(req.paramas.key)
                const data = await Employee.find({
                    "$or":[
                        {"employeeName":{$regex:req.params.key}},
                        {"employeeId":{$regex:req.params.key}},
                        {"obileNumber":{$regex:req.params.key}}
                    ]
                })
  })

module.exports = adminRouter

