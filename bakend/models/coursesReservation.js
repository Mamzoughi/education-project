const mongoose = require("mongoose");

const { stringify } = require("querystring");
const courseReservationSchema = mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  courseId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  score:String,
  scoreTest:String,
   
  note:String,
  firstName :String,
  lastName :String,
});

const courseReservation = mongoose.model("CourseReservation", courseReservationSchema );
module.exports = courseReservation;
