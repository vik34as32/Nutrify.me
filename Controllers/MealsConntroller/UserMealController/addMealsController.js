const mongoose = require('mongoose');
const addMeal = require('../../../model/MealSchema/mealSchema')


//***********************************ADD-MEAL*******************************************************/
const createMeal  =(MealDetail)=>{

    return new Promise((resolve,reject)=>{
         try{ 
             const addNewMeal = new addMeal({
                    userId   :  MealDetail.userId,
                    userName :  MealDetail.userName,
                    Phonenumber : MealDetail.phonenumber,
                    MealType :  MealDetail.MealType,
                    MealName :  MealDetail.MealName,
                    Description :  MealDetail.Description,
                    Calories :  MealDetail.Calories,     
            })
                addNewMeal.save()
                 resolve(addNewMeal)
            }catch(err){
                reject(err)
            }
    }) 
}
module.exports.createMeal =createMeal;

//************************************SORT A Ascending  ORDER ************************************************************/
const Ascending =(userMeal,pageNumber)=>{
    let page_num = parseInt(pageNumber)
    let page_size =4;
    let skip =page_size * (page_num - 1)
    return new Promise(async(resolve,reject)=>{
        try{ 
                const result = await addMeal.
                                     find({userId:userMeal})
                                              .sort({MealName:1}).
                                                         skip(skip).limit(page_size)
                    resolve(result)
           }catch(err){
               reject("Not a sort a data",err)
            }
    })
}
module.exports.Ascending   = Ascending
//******************************************************************************************************* */

//***************************************SORT A Descending  ORDER**********************************************************************/
const Descending =(userMeal,pageNumber)=>{
    let page_num = parseInt(pageNumber)
              let page_size =4;
              let skip =page_size * (page_num - 1)
    return new Promise(async(resolve,reject)=>{
        try{
                const result = await addMeal.
                                             find({userId:userMeal}).
                                                          sort({MealName:-1}).
                                                                         skip(skip).limit(page_size)
                     resolve(result)
                     
        }catch(err){
            reject("Not a sort a data",err)
        }
    })
}
module.exports.Descending   = Descending
//***************************************************************************************************/

//**********************************Fetch  a CurrentDate Data*********************************************************************** */
const currentdateData  =(userdate,userId)=>{
      console.log(userdate)
    return new Promise(async(resolve,reject)=>{
        try{
            const date = await addMeal.find({userId:userId,Date:userdate})
            console.log(date)
            resolve(date)
        }catch(err){
            reject(err)
        }
    })
}
module.exports.currentdateData  = currentdateData
//************************************************************************************************************ */
  

//************************************Calories*******************************************************/

  const getCalories  =(userId,value,pageNumber)=>{
      console.log(userId,value,"akash")
      return new Promise((resolve,reject)=>{
               try{
                    let page_num = pageNumber;
                    let page_size =4;
                    let skip =page_size * (page_num - 1)
                    addMeal
                        .find(
                               {userId:userId,Calories:{$lte:value}},(err,data)=>{
                                        if(err){
                                            reject(err,"can't not be fetch the data becuase server is Not responding")
                                        }else{
                                            resolve(data)
                                        }
                              }).skip(skip).limit(page_size)
                    }catch(err){
                            reject(err,"can't not be fetch the data becuase server is Not responding")
                    }
      })
  }
  module.exports.getCalories  = getCalories

//*********************************Read The user Meal ************************************************************************************ */
  const readUserMeal =(userData,pageNumber)=>{
      return new Promise((resolve,reject)=>{
          try{
              let page_num = pageNumber;
              let page_size =4;
              let skip =page_size * (page_num - 1)

                    addMeal
                         .find({userId:userData} ,function(err, data){
                                if(err){
                                    reject(err)
                                }else{
                                    resolve(data)
                                  
                                }
                           }).skip(skip).limit(page_size)
          }catch(err){
              reject(err)
          }
      })
  }
  module.exports.readUserMeal = readUserMeal;
//*****************************************************************************************************/

//******************************Delete The User_Meal********************************************************************************** */
const deleteUserMeal =(deleteMeal)=>{
    console.log(deleteMeal)
    return new Promise(async(resolve,reject)=>{
        try{
            await addMeal.deleteOne({_id:deleteMeal});
             resolve("Delete a Data successFully")
        }catch(err){
              reject(err)
        }
    })
}
module.exports.deleteUserMeal = deleteUserMeal;
//********************************************************************************************************/


//**************************************UPDATE-MEAL **************************************************************/
const updateMeal = (updateData, MealUpdate)=>{
    return new Promise((resolve,reject)=>{
        try{
              addMeal
                   .findByIdAndUpdate({_id:updateData},MealUpdate,{new:true},(err,data)=>{
                        if(err){
                            reject("Not Updated A DATA")
                        }else{
                            resolve(data)  
                        }
               })
        }catch(err){
            reject(err)
        }
    })
}
module.exports.updateMeal =updateMeal; 
//*******************************************************************************************************************/


//****************************************Filter User Meal_List****************************************************************/
const SearchPanel =(userId,userSearchData)=>{
    console.log(userSearchData)
     return new Promise(async(resolve,reject)=>{
            try{
                  const serach = await addMeal
                                    .find(
                                        {$and:
                                            [{userId:userId},
                                                {MealName:userSearchData},    
                                             ]}
                                    )
                                resolve(serach)
                }catch(err){
                     reject("No record is Found")
                   }
     })
  }
  module.exports.SearchPanel =SearchPanel; 
//**********************************************************************************************************************************/  