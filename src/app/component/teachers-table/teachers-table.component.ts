import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  tutors:any=[];
  constructor(private router:Router, private teacherService: TeacherService) { }

  ngOnInit() {
  //   this.tutors=[{id:"1",name:"Joane Stalone ", speciality:"Math & Phy"},
  //   {id:"2",name:"Susane Taylor ", speciality:"Web Developpement"},
  //   {id:"3",name:"Max Taylor ", speciality:"Web Developpement"},
  //   {id:"4",name:"Jhon Mac", speciality:"Mecanis"},
  //   {id:"5",name:"Ana Taylor", speciality:"Web Developpement"}
  // ]
  this.teacherService.getAllteachers().subscribe(
    (data)=>{this.tutors=data.response}
  )
 
  }
  toDisplay(id){
  this.router.navigate ([`trainer/${id}`]);
  }
  toUpdate(id){
    
    }
  deleteTeacher(id){
  this.teacherService.deleteteacher(id).subscribe();

    }
 
}
