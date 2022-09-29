const { ArrayType } = require("@angular/compiler");
const { EmailValidator } = require("@angular/forms");
const { json } = require("body-parser");
const { table } = require("console");
const mongoose=require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
    id:String,
    firstName:String,
    lastName:String,
    gender:String,
    speciality:String,
    score:String,
    note:String,
    email:{ type: String , unique: true},
    password:String,
    cin:Number,
    tel:Number,
    role:String,
    img:String
});
 userSchema.plugin(uniqueValidator)
 const user=mongoose.model("User", userSchema);
 module.exports=user;