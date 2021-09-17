const mongoose = require('mongoose')
const NutrifyRegiste =require('../../model/UserLoginSchema/index')
const bcrypt  =require('bcrypt')


const createUser = (userdata)=>{
      const {UserName,UserEmail,phonenumber,password,Calorie} =userdata;
      return new Promise((resolve,reject)=>{
             try{
              bcrypt.hash(password, 10, function(err, hash) {
                if(err){
                  reject(err)
                }else{
                    
              
                      const newUser = new NutrifyRegiste()
                      newUser.userName = UserName
                      newUser.userEmail = UserEmail
                      newUser.Phonenumber= phonenumber
                      newUser.Password   = hash
                      newUser.Calorie   = Calorie
                      newUser.save()
                      resolve(newUser)
                }
            });  
             }catch(error){
                reject(error)   
             }

      })
}

module.exports.createUser =createUser


const verifyUser =(userdata)=>{
      return new Promise(async(resolve,reject)=>{
         try{
            const User= await NutrifyRegiste.findOne({
                userEmail:userdata.UserEmail
            })     
            
                bcrypt.compare(userdata.PassWord, User.Password, function(err, result) {
                    if(result){
                      resolve(User)
                    }else{
                      reject('please verify the user Details')
                    }
              });
              resolve(User)
         }catch(err){
             reject(err)
         }
      })
}

module.exports.verifyUser =verifyUser



const readUser =()=>{
    return new Promise(async(resolve,reject)=>{
      try{
        const AllData = await NutrifyRegiste.find()
        resolve(AllData)
      }catch(err){
          reject(err)
      }
    })
}

module.exports.readUser =readUser





const deleteUser =(deleteData)=>{  
  return new Promise(async(resolve,reject)=>{
      try{
         const Delete  =await NutrifyRegiste.findOneAndDelete({ _id:deleteData })
           resolve(Delete)
      }catch(err){    
           reject(err)
      }
  })

}
module.exports.deleteUser =deleteUser
