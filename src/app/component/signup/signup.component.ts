import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  findedUser:any;
  path:string;
  id:string;
  visibility:string="2";
  title:string="Register Now";
  button:string="Signup";
  connectedUser:any;
  visible:boolean=false;
  imagePreview:any;
  constructor(private formBuilder: FormBuilder,private userService:UserService, private router:Router, private activatedRoute:ActivatedRoute, private courseService:CoursesService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      _id: [""],
      firstName: ["", [Validators.minLength(3), Validators.required]], 
      lastName: ["", [Validators.minLength(4), Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      gender: ["", [Validators.required]],
      score: [""],
      scoreQuiz: [""],
      note: [""],
      speciality: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'),
        ],
      ],
      cin: [
        "",
        [Validators.minLength(8), Validators.maxLength(8), Validators.required],
      ],
      tel: ["", Validators.required],
      img: [""],
    });
  this.path = this.router.url;
  console.log(this.path )
  this.id=this.activatedRoute.snapshot.paramMap.get("id");
  this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"))||"indefined";
    
    if(this.path=="/signup/teacher"){
      this.visibility="1"
     }
     else if (this.path=="/signup/admin"){ this.visibility="0"}
     
     else if(this.path ==`/userForm/${this.id}`){
      if(this.connectedUser.role=="Teacher"){this.visible=true}
      this.title="Update User";
      this.button="Validate";
      this.userService.getUserById(this.id).subscribe(
        data=>{
        if(data.user.role == "Teacher"){ this.visibility="1"}
        else if(data.user.role == "Admin"){
          console.log(this.visibility)
          this.visibility="0"}
        console.log(data.user)
        this.signupForm = this.formBuilder.group( {
          _id:this.id,
          firstName: data.user.firstName, 
          lastName: data.user.lastName, 
          email: data.user.email, 
          gender: data.user.gender, 
          password: data.user.password, 
          speciality: data.user.speciality ,
          score:data.user.score,
          scoreQuiz:data.user.scoreQuiz,
          note:data.user.note,
          cin:data.user.cin,
          tel:data.user.tel
         
        });
        console.log(this.findedUser)
        
        }
      )
     }
  
}
   
  signupOrUpdate() {
    // this.signupForm.value.id = JSON.parse(localStorage.getItem("idUser") || "1");

    // localStorage.setItem("idUser", JSON.stringify(this.signupForm.value.id + 1));
    // this.usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    // console.log(this.signupForm.value.id);
    // this.usersTab.push(this.signupForm.value);
    // localStorage.setItem("users", JSON.stringify(this.usersTab));
    console.log(this.signupForm.value);
    alert(this.id)
    if(this.id){
   
      this.userService.updateUser(this.signupForm.value, this.signupForm.value.img).subscribe(
      data=>{console.log(data.user)}
    )}
      
    else{
      this.userService.signupUser({user:this.signupForm.value, path:this.path} , this.signupForm.value.img,).subscribe(
      data=>{console.log(data.msg)
     
      }
    );}
  }
  onImageSelected (event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm .patchValue({ img: file });
    this.signupForm .updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string};
      reader.readAsDataURL(file);}
}
