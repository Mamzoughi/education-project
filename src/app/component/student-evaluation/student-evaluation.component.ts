import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './student-evaluation.component.html',
  styleUrls: ['./student-evaluation.component.css']
})
export class StudentEvaluationComponent implements OnInit {
  evaluationForm:FormGroup;
  id:string;
  courseId:string;
  fidedStudent:any;
  constructor(private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute, private courseService: CoursesService,private userServicce:UserService) { }

  ngOnInit() {
  this.evaluationForm=this.formBuilder.group({
    _id:[''],
    firstName:[''],
    lastName:[''],
    score:[''],
    note:['']

  })
  // Reservation Id
  this.id=this.activatedRoute.snapshot.paramMap.get("id");
  this.courseId=JSON.parse(localStorage.getItem("courseId"))
  this.userServicce.getReservationById(this.id).subscribe(
      data=>{console.log(data.reservation);
      
    this.evaluationForm=this.formBuilder.group({
      _id:data.reservation._id,
      firstName:data.reservation.firstName,
      lastName:data.reservation.lastName,
      score:data.reservation.score,
      note:data.reservation.note,
  
    })
  }
  )

  }
  evaluation(){
    console.log(this.evaluationForm.value)
    this.userServicce.updateReservation(this.evaluationForm.value).subscribe();
  }
}
