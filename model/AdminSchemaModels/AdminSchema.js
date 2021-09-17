const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    adminName:{
        type:String,
        required:true,
        trim:true,
        minlength : 3,
        maxlength : 15
    },
    adminEmail:{
        type:String,
        required:true,
        unique : [true,"email already verified"],
        trim:true,
        minlength : 3,
        maxlength : 35
    },
    adminPassword:{
        type :String,
        required:true,
        minlength:3,
        maxlength:90
    }

})

const adminUser = new mongoose.model('adminUser',AdminSchema)

module.exports = adminUser
