const express = require('express')
const router = express.Router()
const createMeal =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').createMeal
const readUserMeal = require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').readUserMeal
const deleteUserMeal  =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').deleteUserMeal
const updateMeal  =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').updateMeal
const currentdateData =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').currentdateData
const getCalories  =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').getCalories
const SearchPanel  =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').SearchPanel
const Ascending =require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').Ascending
const Descending = require('../../../Controllers/MealsConntroller/UserMealController/addMealsController').Descending
//**********************************Home page********************************************************** */
router.get('/', (req,res)=>{require
    res.render('userAuthenntication/home',{
      user:req.session
    })
  
})
//********************************************************************************************************* */

//*********************************Dashboard Get Request************************************************************************/
router.get('/dashboard',(req,res)=>{
    res.render('userAuthenntication/dashboard',{
      user:req.session
    } )
})

//**********************************Dashbord post request************************************************************************/
router.post('/dashboard',(req,res)=>{
    console.log(req.body.date);
    const date = req.body.date;
    console.log(date)
     currentdateData(req.body.date,req.session.id)
       .then((data)=>{
         console.log(data)
       })
       .catch((err)=>{
         console.log(err)
       })
})
//******************************************************************************************************************************** */


//******************************Get request for Create Meal******************************************************************** */
router.get('/addmeal',(req,res)=>{
  res.render('userAuthenntication/AddMeal',{
    user:req.session
  })
})
//****************************Create a Meal in post request********************************************************* */
router.post('/addmeal',(req,res)=>{
    createMeal(req.body)
          .then((addNewMeal)=>{
                res.redirect('http://localhost:7390/auth/addmeal')
                res.end()
          })
            .catch((err)=>{
                console.log
            })
})
//**************************************************************************************************************************** */

//************************************Read a Meal******************************************************************************************* */
router.get('/meals',async(req,res)=>{
   if(req.query.sortBy == undefined)
            req.query.sortBy='';
        if(req.query.sortBy.toLowerCase() == 'asc'){
                 result = await Ascending(req.session._id,req.query.page)
            }else if(req.query.sortBy.toLowerCase() == 'desc'){
                  result = await Descending(req.session._id,req.query.page) 
            }else if(req.query.Calories==100){
                   result = await getCalories(req.session._id,req.query.Calories,req.query.page)
            }else if(req.query.Calories==200){
                  result = await getCalories(req.session._id,req.query.Calories,req.query.page)
            }else if(req.query.Calories==300){
                result = await getCalories(req.session._id,req.query.Calories,req.query.page)
            }else if(req.query.Calories==400){
              result =  await getCalories(req.session._id,req.query.Calories,req.query.page)
            }else if(req.query.Calories==500){
              result = await getCalories(req.session._id,req.query.Calories,req.query.page)
            }else{
              result = await readUserMeal(req.session._id,req.query.page)
        }
    res.render('userAuthenntication/ListofMeal',{
      user:req.session,
      userMealList:result,
      current: 1,
      pages: 16/4,
    })
})

//***************************************************************************************************************** */


//*********************************Delete Meal*********************************************************************/
router.post('/delete/:id',(req,res)=>{
  deleteUserMeal(req.params.id)
     .then(()=>{
          res.redirect('http://localhost:7390/auth/meals');
          res.end();
     })
     .catch((err)=>{
       console.error("They are server type error",err)
     })
})
//**************************************************************************************************************/

//*********************************Update Meal ******************************************************************************/
//***********************************Update Meal Get Request****************************************************************/
router.get('/editmeal/:id',async(req,res)=>{
   const userUpdateMeal = await updateMeal(req.params.id,req.body)
  res.render('userAuthenntication/editMeal',{
    user:req.session,
    userUpdateMeal:userUpdateMeal
  })
})
//***************************************************************************************************************************/
//***************************************Update Meal POST Request********************************************************************************/
router.post('/updatemeal/:id',async(req,res)=>{
        console.log(req.body,"mukesh ambani")
        await updateMeal(req.params.id,req.body)
          .then(()=>{
            res.redirect('http://localhost:7390/auth/meals');
            res.end();
          })
          .catch(()=>{
              console.log("something went wrong to update a data")
          })
})
//******************************************************************************************************************************************/

//***************************************User Profile**********************************************************************************************************/
router.get('/profile',(req,res)=>{
  console.log(req.session)
  res.render('userAuthenntication/profile',{
    user:req.session
  })
})
//***********************************************************************************************************************/


//***************************************User-Logout********************************************************************************* */
router.post('/signout',(req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/signin')
  })
//************************************************************************************************************************ */  

//****************************************Search The Element***************************************************************************************************/
router.get('/search',(req,res)=>{
  console.log(req.session._id,req.query.value)
      SearchPanel(req.session._id,req.query.value)
        .then((data)=>{
          console.log(data)
            res.json({
             mydata:data
          })
        })
          .catch((err)=>{
            console.log(err)
          })
})
//****************************************************************************************************************************************************************/

module.exports = router