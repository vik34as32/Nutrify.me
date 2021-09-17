const express = require('express')
const router = express.Router()
const readUser  = require('../../../Controllers/UsersController/authentication').readUser
const adminMealListAcessforAllUser  = require('../../../Controllers/MealsConntroller/adminMealsController/adminMealsControllers').adminMealListAcessforAllUser
const adminPanleFromMealListDelete  = require('../../../Controllers/MealsConntroller/adminMealsController/adminMealsControllers').adminPanleFromMealListDelete
const adminPanelMealListFromAscendingOrder  = require('../../../Controllers/MealsConntroller/adminMealsController/adminMealsControllers').adminPanelMealListFromAscendingOrder
const adminPanelMealListFromDescendingOrder  = require('../../../Controllers/MealsConntroller/adminMealsController/adminMealsControllers').adminPanelMealListFromDescendingOrder
const userDelete  =require('../../../Controllers/UsersController/authentication').deleteUser

router.get('/',(req,res)=>{
    const admin  = req.session.username
    res.render('admin/AdminDashBoard/index',{
        admin:req.session
    })
})

router.get('/profile',(req,res)=>{
    res.render('admin/AdminDashBoard/profile',{
        admin:req.session
    })
})



router.get('/userlist',async(req,res)=>{ 
   const data =  await readUser() 
   console.log(data)       
    res.render('admin/AdminDashBoard/list',{
        admin:req.session,
        msg: data,
    })
})

router.post('/userlist/:id',(req,res)=>{
       userDelete(req.params.id)
            .then(()=>{
                res.redirect('/admin/dashboard/userlist');
            })
            .catch((err)=>{
                console.log('Error:', err)
            })
})

router.get('/meallist',async(req,res)=>{
                if(req.query.sortBy == undefined)
                req.query.sortBy='';
                if(req.query.sortBy.toLowerCase() == 'asc'){
                    result = await adminPanelMealListFromAscendingOrder(req.query.page)
               }else if(req.query.sortBy.toLowerCase() == 'desc'){
                    result = await adminPanelMealListFromDescendingOrder(req.query.page) 
              }else{
                result  = await adminMealListAcessforAllUser(req.query.page)
             }
        res.render('admin/AdminDashBoard/MealList',{
            admin:req.session,
            meals:result,
            current: 1,
            pages: 40/5,
        })
})



router.post("/meallist/:id",(req,res)=>{
    adminPanleFromMealListDelete(req.params.id)
                .then((result)=>{
                    res.redirect('/admin/dashboard/meallist');
                    res.end();
                })
                .catch((err)=>{
                    console.log("jsfc",err)
                })
})

router.get('/googlemap',(req,res)=>{
    res.render('admin/AdminDashBoard/googleMap',{
        admin:req.session
    })
})

router.get('/blank',(req,res)=>{
    res.render('admin/AdminDashBoard/Blank',{
        admin:req.session
    })
})

router.post('/Logout',(req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/admin')
  })




module.exports =router