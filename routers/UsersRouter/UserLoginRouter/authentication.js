const express = require('express')
const router = express.Router()
const createUser  = require('../../../Controllers/UsersController/authentication').createUser
const verifyUser = require('../../../Controllers/UsersController/authentication').verifyUser




router.get('/signup',(req,res)=>{
     res.render('User-signUp/SignUp',{
        title: 'SignUp',
        message:''
     })
})


router.get('/signin',(req,res)=>{
    res.render('User-signIn/SignIn',{
        title: 'SignIn',
        message:''
    })
})


router.post('/signup',(req,res)=>{
    createUser(req.body)
         .then((userdata)=>{
             res.redirect('/signin')
         })
         .catch((err)=>{
             res.sendStatus(500)
         })
})

router.post('/signin',(req,res)=>{
      verifyUser(req.body)
            .then((User)=>{
               req.session._id = User._id,
               req.session.email = User.userEmail
               req.session.username =User.userName
               req.session.phonenumber =User.Phonenumber
                res.redirect('/auth')
            })
            .catch((err)=>{
                res.render('User-signIn/signin',{
                    message:"please verify details are provided"
                  })
                 
            })
})


module.exports =router