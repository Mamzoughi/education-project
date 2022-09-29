import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
 
  courseForm: FormGroup;
  course:any={};
  id:string;
  connectedUser:any;
  userId:string;
  courses:any=[];
  button:string="ADD"
  title:string="ADD Course";
  imagePreview:any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CoursesService, private router:Router, private formbuilder: FormBuilder) { }

  ngOnInit() {
    
    this.courseForm =this.formbuilder.group({training:[''],trainer:[''],price:[''],description:[''],studentNbr:[''],img:['']

    });

    this.courses=[{id:"1",training:"Front-End",trainer:"Miss. Ana Taylor", studentNbr:"15",rating:"5", price:"350" },
    {id:"2",training:"Software",trainer:"Mr. Max Taylor", studentNbr:"25",rating:"5",price:"350" },
    {id:"3",training:"Full StacK Js",trainer:"Miss. Susane Taylor", studentNbr:"10",rating:"5",price:"350" }
  ]
  this.id= this.activatedRoute.snapshot.paramMap.get("id");
  if(this.id){
    alert(this.id)
    this.courseService.getCoursesById(this.id).subscribe(
      data=>{this.course=data.course
      console.log(data.course)}
    )
   this.title="Update Course"
   this.button="EDIT"
   
  }
  }
  addOrEditCourse(){
  if(this.id){ 
    this.courseService.updateCourse(this.course).subscribe(
    data=>{console.log(data.course);
    this.router.navigate([`/teacherSpace`]);
    }
  );
}
else{
  this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"indefined";
  console.log(this.courseForm.value.img);
   this.courseService.addCourse({course:this.course, userId:this.connectedUser.id},this.courseForm.value.img).subscribe(
     data=>{console.log(data.msg)}
   );
   
 }}
 onImageSelected (event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.courseForm .patchValue({ img: file });
  this.courseForm .updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string};
    reader.readAsDataURL(file);}
}
