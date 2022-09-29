import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
 courses:any=[];
 searchForm:FormGroup;
 visibility:boolean=false;
 course:any={};
 result:any;
 coursesTab:any=[];
 id:string;
 path:string;
 studentId:string;
  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private router:Router) { }

  ngOnInit() {
  //   this.courses=[{id:"1",training:"Front-End",trainer:"Miss. Ana Taylor", studentNbr:"15",rating:"5",  price:130 },
  //   {id:"2",training:"Software",trainer:"Mr. Max Taylor", studentNbr:"25",rating:"5" , price:150},
  //   {id:"4",training:"Software",trainer:"Miss. Susane Taylor", studentNbr:"25",rating:"5", price:150 },
  //   {id:"3",training:"Full StacK Js",trainer:"Miss. Susane Taylor", studentNbr:"10",rating:"5", price:180 }
  // ]
  this.coursesService.getAllCourses().subscribe(
    data=>{ this.courses=data.courses}
  )
 this.id= this.activatedRoute.snapshot.paramMap.get("id");
 this.path=this.router.url;
 if(this.path=="/courses"){this.visibility=true;}
  if(this.id){
    this.coursesService.getCoursesById(this.id).subscribe(
      data=>{this.courses=[data.course]}
    )}
  if(this.path=="/coursesReservation"){
    this.studentId=JSON.parse(localStorage.getItem("connectedUser")).id;
    this.coursesService.getcoursesReservation(this.studentId).subscribe(
      data=>{
        console.log(data.reservations)
        if(data.reservations){
          for(var i=0; i< data.reservations.length; i++){
          this.coursesService.getCoursesById(data.reservations[i].courseId).subscribe(
            data=>{
              this.coursesTab.push(data.course);
              
            }
          )
          }
           this.courses=this.coursesTab; 
        }
      
      }
    );
  }

  }
  toSearch(){
    this.coursesService.getCoursesByPriceAndName(this.course).subscribe(
      response=>{ this.courses=response.courses}
    )
    
    console.log(this.courses);
  //  this.result=this.courses.filter(
  //    obj=>{return obj.training.toLowerCase().includes(this.course.search.toLowerCase())}
  //  )
// GET/courses?training=this.course.search
   
  }
  update(x) {
    this.courses = x;
  }

}
