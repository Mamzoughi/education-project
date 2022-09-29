import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CoursesService } from "src/app/services/courses.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-courses-table",
  templateUrl: "./courses-table.component.html",
  styleUrls: ["./courses-table.component.css"],
})
export class CoursesTableComponent implements OnInit {

  courses: any = [];
  price: any = {};
  searchForm: FormGroup;
  result: any;
  coursesTab: any = [];
  connectedUser: any;
  path: string;
  userList:any=[];
  visibility:boolean=false;
  pageOfItems: Array<any>;
  constructor(private router: Router, private coursesService: CoursesService, private userService:UserService) {}
  
  ngOnInit() {
    //   this.courses=[{id:"1",training:"Front-End",trainer:"Miss. Ana Taylor", studentNbr:"15",rating:"5", price:"350" },
    //   {id:"2",training:"Software",trainer:"Mr. Max Taylor", studentNbr:"25",rating:"5",price:"350" },
    //   {id:"3",training:"Full StacK Js",trainer:"Miss. Susane Taylor", studentNbr:"10",rating:"5",price:"350" }
    // ]
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    if(this.connectedUser.role=="Teacher"){this.visibility=true}
    this.path = this.router.url;
    console.log(this.path);
    if (this.path == "/teacherSpace") {
      
      
      this.coursesService
        .getCoursesByTeacherID(this.connectedUser.id)
        .subscribe((data) => {
          this.courses = data.courses;
        });
      console.log(this.courses);
    } else {
      this.coursesService.getAllCourses().subscribe((data) => {
        this.courses = data.courses;
      });
      console.log(this.courses);
    }
  }

  toDisplay(id) {
    this.router.navigate([`course/${id}`]);
  }
  toUpdate(id: number) {
    this.router.navigate([`coursForm/${id}`]);
  }
  deleteCourse(id) {
    this.coursesService.deleteCourse(id).subscribe((data) => {
      console.log(data.message);
      location.reload();
    });
  }
  toSearch() {
    this.coursesService.getCoursesByPrice(this.price).subscribe((data) => {
      this.courses = data.courses;
      console.log(this.courses);
    });
  }
  getStudentList(courseId){
    this.router.navigate([`/studentlist/${courseId}`]);
    localStorage.setItem("courseId",JSON.stringify(courseId)
    );
  }
  addQuiz(courseId){
    this.router.navigate([`/quiz/${courseId}`]);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
