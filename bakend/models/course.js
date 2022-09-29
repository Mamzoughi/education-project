const mongoose=require("mongoose");
const courseSchema=mongoose.Schema({
    training:String,
    price:Number,
    description:String,
    trainer:String,
    teacherId:String,
    studentNbr:Number,
    img:String,
})
const course=mongoose.model("Course", courseSchema);
module.exports=course;