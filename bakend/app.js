
// import du module express
const express= require("express");
// Import du module moment
// creation d'une application express nomé app
const app=express();
const moment= require("moment");
// Import du module body parser
const bodyParser=require("body-parser");
// import du du module json web token
const jwt=require("jsonwebtoken");
// Import du Module bcrypt
const bcrypt=require("bcrypt");
// Import du Module nodemailer
const nodemailer=require("nodemailer");
// Import du module mongoose
const mongoose= require("mongoose");
// Import du module mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');
const { UseExistingWebDriver } = require("protractor/built/driverProviders");
// connexion à la DB
mongoose.connect('mongodb://localhost:27017/educDB');

// Import du module path
const path= require("path");
// Configuration de Multer
 const multer= require("multer");
const CourseReservation=require("./models/coursesReservation");
const EventReservation=require("./models/eventReservation");
const { ObjectId } = require("mongodb");
const User= require ("./models/user");
const Course= require ("./models/course");
const Event=require ("./models/event");
const Quiz = require("./models/quiz");
const RealisedQuiz = require("./models/realisedQuiz");
const Comment = require("./models/comment");
const comment = require("./models/comment");
const quiz = require("./models/quiz");
const { application } = require("express");
const { get } = require("http");


// configuration du module pour envoyer les reponse au FE sous format Json
app.use(bodyParser.json());
// configuration du module pour recevoir les requette du FE sous format Json
app.use(bodyParser.urlencoded({extended:true}));

// configutaion de sécurité
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    next();
});
app.use('/images', express.static(path.join('bakend/images')));
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storageConfigEvent = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
        }
        cb(null, 'bakend/images/event')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '.' + 
extension;
        cb(null, imgName);
    }
});
// Config User
const storageConfigUser = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
        }
        cb(null, 'bakend/images/user')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '.' + 
extension;
        cb(null, imgName);
    }
});
// config Course
const storageConfigCourse = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
        }
        cb(null, 'bakend/images/course')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '.' + 
extension;
        cb(null, imgName);
    }
});

// let teachers=[{id:"1",name:"Joane Stalone ", speciality:"Math & Phy"},
//   {id:"2",name:"Susane Taylor ", speciality:"Web Developpement"},
//   {id:"3",name:"Max Taylor ", speciality:"Web Developpement"},
//   {id:"4",name:"Jhon Mac", speciality:"Mecanis"},
//   {id:"5",name:"Ana Taylor", speciality:"Web Developpement"}
// ];

//  Traitement logic de get all courses
app.get("/courses",(req, res)=>{
  Course.find().then((response)=>{
    
    res.json({courses:response})
  });
  
});
// Traitement logic de add course
app.post("/courses",multer({storage : storageConfigCourse}).single('img'), (req,res)=>{
   console.log(req.file.filename)
  let url=req.protocol +'://'+ req.get('host');
  let course= new Course({
    training:req.body.training,
    price:req.body.price,
    trainer:req.body.trainer,
    teacherId:req.body.teacherId,
    description:req.body.description,
    studentNbr:req.body.studentNbr,
    img:url+'/images'+'/course/'+req.file.filename,
  })
  course.save().then((response)=>{
    if(response){
      res.json({msg:"Course Added"})
    }
  });
});
// Traitement logic de get course by Id
app.get("/courses/:id", (req,res)=>{

  Course.findOne({_id:req.params.id}).then((response)=>{
  if(response){
    res.json({course:response})
  }
});
  
});
// Traitement logic de get teacher Courses
app.get("/courses/search/:id", (req,res)=>{

  Course.find({teacherId:req.params.id}).then((response)=>{
  if(response){
   
    res.json({courses:response})
  }
});
  
});
// Traitement logic de delete course
app.delete("/courses/:id", (req,res)=>{
  
 Course.deleteOne({_id:req.params.id}).then((response)=>{
  if(response.deletedCount==1){
   res.json({message:"Course Deletted"})}
 });

}

);
// Traitement logic de update course
app.put("/courses/:id", (req,res)=>{
  Course.updateOne({_id:req.params.id},req.body).then((response)=>{
    if(response.modifiedCount==1){
      res.json({msg:"Course Updated"})
    }
    
  });
});
// Traitement de filter courses by price (min/max)
app.post("/courses/search",(req,res)=>{
 
  Course.find({"price":{ '$gte': req.body.min} ,"price": {'$lte':req.body.max}}).then((response)=>{
  // Course.find({"price": {"$and": [{'$gte': req.body.min}, {'$lte':req.body.max}]}}).then((response)=>{
   
    res.json({courses:response})
  });
});
// Traitement de filter courses by price And Name
app.post("/courses/searchByName",(req,res)=>{
 
  Course.find({"name":req.body.name ,"price": {'$lte':req.body.price}}).then((response)=>{
  // Course.find({"price": {"$and": [{'$gte': req.body.min}, {'$lte':req.body.max}]}}).then((response)=>{
    
    res.json({courses:response})
  });
});
// Traitement logic de get all  events
app.get("/events",(req,res)=>{
  Event.find().then((response)=>{
    
    res.json({events:response})
})});
  // Traitement logic de add Event
  app.post("/events",multer({storage : storageConfigEvent}).single('img'),(req,res)=>{
    console.log(req.file.filename);
    let url=req.protocol +'://'+ req.get('host');
    let event= new Event({
    eventName:req.body.eventName,
    eventDescription:req.body.eventDescription,
    eventCreatorId:req.body.eventCreatorId,
    eventDate:req.body.eventDate,
    eventPlace:req.body.eventPlace,
    eventPrice: req.body.eventPrice, 
    img: url+'/images/event/'+req.file.filename,
    });
    console.log(event.eventDate)
   event.save().then((response)=>{
     if(response){
       res.json({msg:"Event Added with Success"})
     }
   });
  });
// Traitement logic de getEvent By Id
app.get("/events/:id", (req,res)=>{
  Event.findOne({_id:req.params.id}).then((response)=>{
    
   if(response){
    //  response.eventDateStart=moment(response.eventDateStart).format("YY/MM/DD");
     
     res.json({event:response})
   }
  });
});
// Traitement logic de update event
app.put("/events/:id",multer({storage : storageConfigEvent}).single('img'), (req,res)=>{
  
  let url=req.protocol +'://'+ req.get('host');
  Event.updateOne({_id:req.params.id},req.body).then((response)=>{

    if(response.modifiedCount==1){
      console.log("Event Updated")
     
      res.json({msg:"Event Updated"})
    }   
  });
});
// Traitement logic de delete Event By Id
app.delete("/events/:id",(req,res)=>{
 Event.deleteOne({_id:req.params.id}).then((response)=>{
  if(response.deletedCount==1){
    res.json({msg:"Event Deletted"})
  }
 });
});
// Traitement logic de get event by name and date
app.post("/events/search", (req,res)=>{
  // console.log(moment(req.body.date).format("DD/MM/YYYY"))
  
 Event.find({"eventName":req.body.name,"eventDate":req.body.date}).then((response)=>
 {
  
 });
  
 });

// signup user(Add User)
app.post("/users/signup",multer({storage : storageConfigUser}).single('img'),(req,res)=>{
  let url=req.protocol +'://'+ req.get('host');
   let path=req.body.path;
  if(req.body.path=="/signup/student"){
  
    bcrypt.hash(req.body.password,10).then((cryptedPwd)=>{
      
    let user= new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      gender:req.body.gender,
      email:req.body.email,
      password:cryptedPwd,
      scoreTest:[{}],
      cin:req.body.cin,
      tel:req.body.tel,
      role:"Student",
      img: url+'/images'+'/user/'+req.file.filename,
    });
 
   
  user.save((err,doc)=>{
   
    if(err){
      res.json({msg:"Email Existant"})
     }
     else{
      
    res.json({msg:"Student Added"})
    sendMsg( req.body.email);
   
    }
}); });
}
  else if(req.body.path=="/signup/teacher"){
    bcrypt.hash(req.body.password,10).then((cryptedPwd)=>{
    let user= new User({
      
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      gender:req.body.gender,
      speciality:req.body.speciality,
      email:req.body.email,
      password:cryptedPwd,
      tel:req.body.tel,
      role:"Teacher",
      img: url+'/images/user/'+req.file.filename,
  });
      
  user.save((err,doc)=>{
    if(err){
      res.json({msg:"Email Existant"})
     }
     else{
    res.json({msg:"Teacher Added"})
    sendMsg( req.body.email);}
});});
}
  else{
    console.log(req.body);
    bcrypt.hash(req.body.password,10).then((cryptedPwd)=>{
    let user= new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:cryptedPwd,
      role:"Admin",
      img: url+'/images/user/'+req.file.filename,
  });
    
  user.save((err,doc)=>{
    if(err){
      res.json({msg:"Email Existant"})
     }
     else{
      
    res.json({msg:"Admin Added"})
    sendMsg( req.body.email);
  }
});});

}});
// loginUser
app.post("/users/login", (req,res)=>{
let user=req.body;
User.findOne({email:req.body.email}).then((response)=>{
 
  return bcrypt.compare(req.body.password, response.password);
  }).then((pwdResult)=>{
    console.log("pwdResult", pwdResult);
    if(!pwdResult){
      res.json({msg:"1"});
    }
   else{
    User.findOne({email:req.body.email}).then(
      (finalResult)=>{
        
         let userToSend={
           id:finalResult._id,
           fName:finalResult.firstName,
           lName:finalResult.lastName,
           role:finalResult.role

          }
          
         res.json({
           msg:"2",
           findedUser:userToSend,
         });
      });
    }
});
});
// Display all Users
 app.get("/users",(req,res)=>{
   let sort={role:-1};
   User.find().sort({ role: 1 }).then((response)=>{
     res.json({users:response})
   });
 });
//  delete User By ID
app.delete("/users/:id", (req,res)=>{
  User.deleteOne({_id:req.params.id}).then((response)=>{
    if(response.deletedCount==1){
      res.json({msg:"User Deleted with success"})
    }
    
  });
});
// Traitement Logic de get User By Id
app.get("/users/:id", (req,res)=>{
  User.findOne({_id:req.params.id}).then((response)=>{
    if(response){
      res.json({user:response})
      
    }   
  });
});
// Traitement logic de update user
app.put("/users/:id",multer({storage : storageConfigUser}).single('img'), (req,res)=>{
  console.log(req.body)
  console.log(req.params.id)
  let url=req.protocol +'://'+ req.get('host');
  User.updateOne({_id:req.params.id},req.body).then((response)=>{


    if(response.modifiedCount==1){
      console.log("Updated")
     
      res.json({msg:" Updated"})
    }   
  });
});

//Traitement logic de add course reservation

app.post("/courses/addReservation", (req, res) => {
  // console.log("Here into addreservation", req.body);
  const courseReservation = new CourseReservation({
    
    userId: ObjectId(req.body.userId),
    courseId: ObjectId(req.body.courseId),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    score:"",
    scoreTest:"",
    note:"",

  });
  courseReservation.save((err, result) => {
    if(err){res.json({message:"0"})}
    // console.log("Error", err);
    if (result) {
      res.status(200).json({
        message: "1",
      });
    }
  });
});
// Traitement logic de get student coursesReservation
app.get("/coursesreservations/:id", (req,res)=>{
 id=req.params.id;
 console.log(id)
 var tab= [];
 console.log(id)
  User.aggregate(
    [
      {
        $lookup: {
          from: "coursereservations", // collection to join
          localField:"_id", //field from the input documents
          foreignField:"userId", //field from the documents of the "from" collection
          as: "reservationsC", // output array field
        },
      },
    ],
    (error, docs) => {
      
     console.log("here test doc",docs)
      const reservations=docs.find(obj=>{return obj._id == req.params.id});
      console.log(reservations)
      res.json({
        reservations: reservations.reservationsC
      });
    });
});
// Traitement logic de add scoreTest to courseReservation collection
app.put("/coursesreservations/:id",(req,res)=>{
  CourseReservation.updateOne({_id:req.params.id},req.body).then((response)=>{
   console.log("Scoreest",response)
  });
});
// Traitement de update reservation
app.put("/reservations/:id",(req,res)=>{
  console.log("body",req.body)
  console.log("params",req.params.id)
  CourseReservation.updateOne({_id:req.params.id},req.body).then((response)=>{
    
   console.log("Scoreest",response)
  });
});
// Traitement logic de delete course reservation
// app.delete("/usersreservations/:obj`", (req,res)=>{
//   console.log("body",req.params.obj.courseId)
//  CourseReservation.deleteOne({courseId:req.params.obj.courseId,userId:req.params.obj.userId}).then((response)=>{
//    res.json({msg:"Resevation deleted"})
//  })
// });
// Traitement logic de add event reservation
app.post("/eventsreservations", (req, res) => {
  console.log("Here into addreservation", req.body);
  const eventReservation = new EventReservation({
    
    userId: ObjectId(req.body.userId),
    eventId: ObjectId(req.body.eventId),
  });
  eventReservation.save((err, result) => {
    console.log("Error", err);
    if(err){ res.json({
      message: "0",
    });}
    else {
      res.status(200).json({
        message: "1",
      });
    }
  });
});
// Traitement de get reservation By Id
app.get("/reservations/:id", (req,res)=>{
  CourseReservation.findOne({_id:req.params.id}).then((response)=>{
    res.json({reservation:response})
  });
});
// Traitement logic de get student event reservation
app.get("/eventsreservations/:id", (req,res)=>{
  id=req.params.id;
  var tab= [];
  console.log(id)
   User.aggregate(
     [
       {
         $lookup: {
           from: "eventreservations", // collection to join
           localField:"_id", //field from the input documents
           foreignField:"userId", //field from the documents of the "from" collection
           as: "rEvents", // output array field
         },
       },
     ],
     (error, docs) => {
       
       console.log("id",req.params.id)
       const reservations=docs.find(obj=>{return obj._id == req.params.id}).rEvents;
      
       res.json({
         reservations: reservations,
       });
     });
 });
//  Traitement logic de get list student 
app.get("/usersreservations/:id", (req,res)=>{
  
  CourseReservation.find({courseId:req.params.id}).then((response)=>{
    res.json({reservations:response})
  });
});
// Traitement logic de get All Teacher
app.get("/users",(req,res)=>{
  
  User.find({ role:Teacher}).then((response)=>{
   
    res.json({users:response})
  });
});
// Traitement logic de add quiz
app.post("/quizs", (req,res)=>{
 const quiz= new Quiz({
  questionOne:req.body.quiz.questionOne,
  answerOne:req.body.quiz.answerOne,
  answerTwo:req.body.quiz.answerTwo,
  answerThree:req.body.quiz.answerThree,
  rightAnswerOne:req.body.quiz.rightAnswerOne,
  questionTwo:req.body.quiz.questionTwo,
  answerFour:req.body.quiz.answerFour,
  answerFive:req.body.quiz.answerFive,
  answerSex:req.body.quiz.answerSex,
  rightAnswerTwo:req.body.quiz.rightAnswerTwo,
  questionThree:req.body.quiz.questionThree,
  answerSeven:req.body.quiz.answerSeven,
  answerHeight:req.body.quiz.answerHeight,
  answerNine:req.body.quiz.answerNine,
  rightAnswerThree:req.body.quiz.rightAnswerThree,
  courseId:req.body.courseId,
  courseName:req.body.courseName,

 });
 quiz.save().then((response)=>{
 
 });
});
// Traitement logic de get quiz By courseId
app.get("/quizs/:id", (req,res)=>{
  console.log(req.params.id)
   Quiz.findOne({"courseId":req.params.id}).then((response)=>{
    console.log(response)
     res.json({quizs:response})
   });
 });
// Traitement logic de add quiz response
app.post("/realisedQuizs",(req,res)=>{
let realisedQuiz=new RealisedQuiz({
  userId:req.body.userId,
  quizId:req.body.quizId,
  score:req.body.score,
})
realisedQuiz.save().then((response)=>{
   console.log(response)
});
});
// Traitement Realised Quiz By student Id
app.get("/realisedQuizs/:id" , (req,res)=>{
  User.aggregate(
    [
      {
        $lookup: {
          from: "realisedquizzes", // collection to join
          localField:"_id", //field from the input documents
          foreignField:"userId", //field from the documents of the "from" collection
          as: "result", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log(docs[1])
     const result=docs.filter(doc=>{return doc.result.userId==req.params.id})
     console.log(result)
      res.json({
        result:result
      });
    });
});
// Traitement Logic de 
app.get("/allrealisedQuizs/:id" , (req,res)=>{
  User.aggregate(
    [
      {
        $lookup: {
          from: "realisedquizzes", // collection to join
          localField:"_id", //field from the input documents
          foreignField:"userId", //field from the documents of the "from" collection
          as: "result", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log(docs[1])
     
      res.json({
        result:docs
      });
    });
});
// Traitement logig de add comments
app.post("/comments", (req,res)=>{
  const comment=new Comment({
    trainerId:req.body.trainerId,
    userId:req.body.userId,
    content:req.body.comment.content,
  })
  comment.save().then((response)=>{
   res.json({msg:"Comment Added"})
  });
});
// Traitement logic de get all comments
app.get("/comments", (req,res)=>{
  // Comment.find().then((response)=>{
  //  res.json({comments:response})
  // });
  User.aggregate(
    [
      {
        $lookup: {
          from: "comments", // collection to join
          localField:"_id", //field from the input documents
          foreignField:"userId", //field from the documents of the "from" collection
          as: "comment", // output array field
        },
      },
    ],
    (error, docs) => {
      
     const comments=docs.filter(doc=>{return doc.comment.length})
     console.log(comments)
      res.json({
        comments:comments
      });
    });
});
function sendMsg( expMail) {
  
  const transporter = nodemailer.createTransport({
    service:'outlook', 
    auth: {
      user:'test.test.test33@outlook.com', // generated ethereal user
      pass:'Mm!123456' // generated ethereal password
    },
  });
  const info = {
    from: 'test.test.test33@outlook.com', // sender address
    to: expMail, // list of receivers
    subject: 'Registration confirmation', // Subject line
    text: 'We confirm your registration ,'+
           'Best regards,'

  };
  transporter.sendMail(info,function(error,information){
  if(error){
    console.log("error", error);
  }
  else{
    console.log("Email Sent", information);
  }
  });
}
app.post("/weather",(req,res)=>{
  let x=req.body;
  
 
  });
  app.post("/weather/search", (req, res) => {
    let country = req.body.search;
    let key = "62ee756a34835483299877a61961cafb";
    let apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      country +
      "&appid=" +
      key+ "&units=metric";
    axios.get(apiUrl)
      .then((response) => {
        console.log('Here response', response);
        let weather = response.data.main;
        console.log('Here weather  main', weather);
        let result = {
            temp: weather.temp,
            pressure: weather.pressure,
            humidity:weather.humidity,
            country:response.data.name,
            image:response.data.weather[0].icon,
            wind:response.data.wind.speed
        }
        res.status(200).json({
            result:result
            

        })
      });});
// export de l'application app
module.exports=app;

