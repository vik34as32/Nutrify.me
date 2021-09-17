const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');


const addMealSchema  = new mongoose.Schema({
    userId:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength : 3,
         maxlength : 15
    },
    Phonenumber:{
        type:Number,
        required:true,
        trim:true,
        min:10
    },
     MealType:{
            type:String,
            required: true,
            trim:true,
            minlength : 3,
            maxlength : 35
        },
        MealName:{
            type:String,
            required:true,
            trim:true,
            minlength : 3,
            maxlength : 35
        },
        Description:{
            type:String,
            trim:true,
            minlength : 3,
        },
        Calories:{
            type:Number,
            required:true,
            trim:true,   
            min:1
        },
        Date:{
            type: Date,
            default : Date  
        }
    

})

const Meals  = new mongoose.model('Meals',addMealSchema)

module.exports = Meals