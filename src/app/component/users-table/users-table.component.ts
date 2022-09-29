import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
 users:any=[];
 visibility:boolean=true;
 courseId:string;
 button:string="Update";
 courseName:string="";
 connectedUser:any;

  constructor(private userService: UserService, private router:Router, private activatedRoute:ActivatedRoute, private courseService:CoursesService) { }

  ngOnInit() {
    // this.users=JSON.parse(localStorage.getItem("users") || "[]");
   

    this.courseId=this.activatedRoute.snapshot.paramMap.get("id");
    if(this.courseId){
      this.visibility=false
      this.button="Evaluation"
     this.courseService.getCoursesById(this.courseId).subscribe(
       data=>{this.courseName=`Student List (Course:${data.course.training})`}
     )
    this.userService.getUserReservation(this.courseId).subscribe(
      data=>{console.log(data.reservations)
        this.users=data.reservations;
      //    for(var i=0; i<data.reservations.length;i++){
      //        this.userService.getUserById(data.reservations[i].userId).subscribe(
      //          response=>{this.users.push(response.user)
                
      //          console.log(this.users)
      //         });
      //        }   
      }
    )}
    else{ this.userService.displayUsers().subscribe(
      data=>{this.users=data.users}
    );}
  }
  deleteUser(userId){
    
    // if(this.courseId){this.userService.deleteCourseReservation({userId:userId,courseId:this.courseId}).subscribe()}
    // else{
    this.userService.deleteUser(userId).subscribe(
      data=>{console.log(data.msg)
        location.reload();
      }
    )
  // }
  }
  toUpdate(id){
   this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"undefined";

   if(this.connectedUser.role=="Teacher"){
    this.router.navigate([`evaluation/${id}`]);
   }
   else{
    this.router.navigate([`userForm/${id}`]);}
   
   
  }

}
