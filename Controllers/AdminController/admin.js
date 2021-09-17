const mongoose = require('mongoose')
const adminUser  =require('../../model/AdminSchemaModels/AdminSchema')
const NutrifyRegiste =require('../../model/UserLoginSchema/index')
const bcrypt  =require('bcrypt')


const createAdminUser =(admindetail)=>{
     return new Promise((resolve,reject)=>{
           try{
            bcrypt.hash(admindetail.adminPassword, 10, function(err, hash) {
                if(err){
                    reject(err)
                }else{
                        const adminNewUser =  new adminUser()
                        adminNewUser.adminName =admindetail.adminName
                        adminNewUser.adminEmail =admindetail.adminemail
                        adminNewUser.adminPassword =hash
                        adminNewUser.save()
                        resolve(adminNewUser)
                }
            });
           }catch(err){
                  reject(err)
           }
     })
}

module.exports.createAdminUser =createAdminUser

const verifyAdminUser  = (admindetail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const AdminLogin =  await adminUser.findOne({
                adminEmail:admindetail.adminemail
             })
             bcrypt.compare(admindetail.adminPassword, AdminLogin.adminPassword, function(err, result) {
                if(result){
                  resolve(AdminLogin)
                }else{
                  reject('please verify the user Details')
                }
          });
        }catch(err){
            reject(err)
        }
        
    })
}
module.exports.verifyAdminUser =verifyAdminUser


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

