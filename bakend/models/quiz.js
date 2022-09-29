const mongoose=require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const quizSchema=mongoose.Schema({
    questionOne:String,
    answerOne:String,
    answerTwo:String,
    answerThree:String,
    rightAnswerOne:String,
    questionTwo:String,
    answerFour:String,
    answerFive:String,
    answerSex:String,
    rightAnswerTwo:String,
    questionThree:String,
    answerSeven:String,
    answerHeight:String,
    answerNine:String,
    rightAnswerThree:String,
    courseId:{ type: String , unique: true},
    courseName:String,
    
})
quizSchema.plugin(uniqueValidator)
const quiz=mongoose.model("Quiz", quizSchema);
module.exports=quiz;