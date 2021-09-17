const express = require('express')
const router = express.Router()
const createAdminUser = require('../../../Controllers/AdminController/admin').createAdminUser
const verifyAdminUser =require('../../../Controllers/AdminController/admin').verifyAdminUser
router.get('/',(req,res)=>{
     res.render('admin/adminLogin/admin',{message :''})
})

router.post('/signup',(req,res)=>{
    createAdminUser(req.body)
           .then((adminNewUser)=>{res.end("Adminuser SignUp Sucessfully")})
           .catch((err)=>{res.end("new type of error")
          })
})

router.post('/',(req,res)=>{
     verifyAdminUser(req.body)
            .then((AdminLogin)=>{
               req.session._id = AdminLogin._id,
               req.session.adminEmail =AdminLogin.adminEmail
               req.session.username   =AdminLogin.adminName
               res.redirect("/admin/dashboard")
          })
            .catch((err)=>{
                 res.render('admin/adminLogin/admin',{
                    message:"please verify details are provided"
                 })
            })
})

module.exports =router      