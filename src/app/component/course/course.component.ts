import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'querystring';

import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  errorMsg:string="";
  button:boolean=false;
  path:string;
  connectedUser:any;
 @Input() C: any;
 @Output() newCourses:EventEmitter<any> = new EventEmitter();
 userId:string;
 firstName:string;
 lastName:string;

  constructor(private courseService: CoursesService, private router:Router,private activatedRoute:ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
   this.path=this.router.url;
   this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))|| "undefined";

   if(this.connectedUser.role=="Student" && this.path=="/courses"){this.button=true}

  }
  styling(price:any){
    if(price>0 && price<500){return 'orange'}
    else if(price >= 500 && price<1000){return 'blue'}
    else return 'red';
    }

    participateToCourse(C){
      this.userId=JSON.parse(localStorage.getItem("connectedUser")).id;
      if(C.studentNbr==0){
      this.errorMsg="All the places are reserved";
      }
      else{
        this.userService.getUserById(this.userId).subscribe(
          data=>{
            this.firstName=data.user.firstName
            this.lastName=data.user.lastName
          }
        )
        this.courseService.getcoursesReservation(this.userId).subscribe(
          data=>{ 
           if(data.reservations.find(obj=>{return obj.courseId == C._id})){this.errorMsg="You Are Already registred"}
           else{ 
             C.studentNbr=C.studentNbr-1;
            this.courseService.updateCourse(C).subscribe(
             data=>{ console.log (data.course)
               
               this.courseService.createCoursesReservation({userId:this.userId,courseId:C._id, firstName:this.firstName, lastName:this.lastName}).subscribe(
                 data=>{console.log(data.message)
                 this.errorMsg="Reservation Registered Successfully"}
                );
               this.courseService.getAllCourses().subscribe(
                  data=>{this.newCourses.emit(data.courses);}
               )
             }
            )}

            })
     
    }
    

}}
