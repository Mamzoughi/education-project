const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const realisedQuizSchema = mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  quizId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "quiz"
  },
  score:String,
});

const realisedQuiz = mongoose.model("RealisedQuiz", realisedQuizSchema );
module.exports = realisedQuiz;
