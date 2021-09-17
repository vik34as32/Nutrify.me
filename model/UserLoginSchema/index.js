const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength : 3,
         maxlength : 15
    },
    userEmail:{
        type:String,
        required:true,
        unique : [true,"email already verified"],
        trim:true,
        minlength:3,
        maxlength:30
    },
    Phonenumber:{
        type:Number,
        required:true,
        unique : [true,"phone already verified"],
        trim:true,
        min:10
    },
    Password:{
        type :String,
        required:true,
        minlength:3,
        maxlength:90
    },
    Calorie:{
      type : Number,
      required : true,
    }
})

const NutrifyRegister = new mongoose.model('NutrifyRegister',RegisterSchema)





module.exports = NutrifyRegister