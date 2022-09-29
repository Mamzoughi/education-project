import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CommentService } from 'src/app/services/comment.service';
import { CoursesService } from 'src/app/services/courses.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-best-tutors',
  templateUrl: './best-tutors.component.html',
  styleUrls: ['./best-tutors.component.css']
})
export class BestTutorsComponent implements OnInit {
  tutors:any=[];
  comments:any=[];
  tutorId:string;
  connectedUser:any;
  tutorsTab:any=[];
  button:boolean=false;
  constructor(private activatedRoute: ActivatedRoute, private commentService:CommentService, private userService: UserService, private courseService:CoursesService) { }

  ngOnInit() {
  //   this.tutors=[{id:"1",name:"Joane Stalone ", speciality:"Math & Phy"},
  //   {id:"2",name:"Susane Taylor ", speciality:"Web Developpement"},
  //   {id:"3",name:"Max Taylor ", speciality:"Web Developpement"},
  //   {id:"4",name:"Jhon Mac", speciality:"Mecanis"},
  //   {id:"5",name:"Ana Taylor", speciality:"Web Developpement"}
  // ]
  this.userService.displayUsers().subscribe(
    data=>{
      this.tutors=data.users.filter(user=>{ return user.role=="Teacher"})
   ;
      
    }
  )
  console.log(this.tutors)
  this.commentService.getAllComments().subscribe(
    data=>{ 
      console.log(data.comments);
      
      this.comments=data.comments;
    }
  );  console.log(this.comments)
  this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"undefined";
  if(this.connectedUser.role=="Student"){
    this.courseService.getcoursesReservation(this.connectedUser.id).subscribe(
      data=>{console.log(data.reservations)
        if(data.reservations){
          this.button=true;
           for (var i=0; i<data.reservations.length; i++){
            this.courseService.getCoursesById(data.reservations[i].courseId).subscribe(
              response=>{
                this.userService.getUserById(response.course.teacherId).subscribe(
                  docs=>{this.tutorsTab.push(docs.user)
                  }
                )
              }
            )
           }
           this.tutors=this.tutorsTab;
           console.log(this.tutors)
        }}
        
    )
  }
  this.tutorId=this.activatedRoute.snapshot.paramMap.get("id");
  
  if(this.tutorId){
    this.tutors=this.tutors.filter(
     obj=>{return obj.id == this.tutorId}
     
   )
  
  }
  }
  
  

}
