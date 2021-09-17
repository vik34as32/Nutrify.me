const mongoose = require('mongoose');
const addMeal = require('../../../model/MealSchema/mealSchema')




//**************************************All MEAL-DETAILS***********************************************************/
const adminMealListAcessforAllUser = (pageNumber)=>{
    console.log(pageNumber)
      return new Promise(async(resolve,reject)=>{
          try{
                    let page_num = parseInt(pageNumber)
                    let page_size =5;
                    let skip =page_size * (page_num - 1)
                const  ListOfFood  = await addMeal.find({}).skip(skip).limit(page_size)
                 resolve(ListOfFood)
          }catch(err){
                    reject(err,"Can't get list of the food Because My Server is Not Responding")
          }
      })
}
module.exports.adminMealListAcessforAllUser =adminMealListAcessforAllUser;
//**********************************************************************************************************



//****************************************Delete-MEAL***************************************************************/
const adminPanleFromMealListDelete =(deleteData)=>{  
    return new Promise(async(resolve,reject)=>{
        try{
             const Delete  =await addMeal.findOneAndDelete({ _id:deleteData})
             resolve(Delete)
          }catch(err){
             reject(err)
           }
    })
}
module.exports.adminPanleFromMealListDelete =adminPanleFromMealListDelete;
//********************************************************************************************/


//***********************************Ascending**************************************************** */
const adminPanelMealListFromAscendingOrder =(pageNumber)=>{
    let page_num = parseInt(pageNumber)
    let page_size =4;
    let skip =page_size * (page_num - 1)
    return new Promise(async(resolve,reject)=>{
        try{ 
                const result = await addMeal.
                                     find({})
                                              .sort({MealName:1}).
                                                         skip(skip).limit(page_size)
                    resolve(result)
           }catch(err){
               reject("Not a sort a data",err)
            }
    })
}
module.exports.adminPanelMealListFromAscendingOrder   = adminPanelMealListFromAscendingOrder
//****************************************Descending******************************************************* */
const adminPanelMealListFromDescendingOrder =(pageNumber)=>{
    let page_num = parseInt(pageNumber)
    let page_size =4;
    let skip =page_size * (page_num - 1)
    return new Promise(async(resolve,reject)=>{
        try{ 
                const result = await addMeal.
                                     find({})
                                              .sort({MealName:- 1}).
                                                         skip(skip).limit(page_size)
                    resolve(result)
           }catch(err){
               reject("Not a sort a data",err)
            }
    })
}
module.exports.adminPanelMealListFromDescendingOrder   = adminPanelMealListFromDescendingOrder
//************************************************************************************************ */