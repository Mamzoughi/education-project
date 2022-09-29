import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  quizForm=FormGroup;
  quiz:any={};
  courseId:string;
  courseName:String;
  constructor(private quizService: QuizService, private activatedRoute:ActivatedRoute,private courseService:CoursesService) { }

  ngOnInit() {
  }
addQuiz(){
 this.courseId=this.activatedRoute.snapshot.paramMap.get("id")
this.courseService.getCoursesById(this.courseId).subscribe(
  data=>{this.courseName=data.course.training
    this.quizService.addQuiz({quiz:this.quiz, courseId:this.courseId, courseName:this.courseName}).subscribe();
  }
)

}
}
