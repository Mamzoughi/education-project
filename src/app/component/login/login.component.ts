import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  connectedUserId:string;
  user: any = {};
  usersTab: any = [];
  idUser: number;

  constructor( private userService:UserService, private router:Router ) {}

  ngOnInit() {
   
  }

  login() {
    
    this.userService.loginUser(this.user).subscribe(
      data=>{ 
              if(data.findedUser){
                if(data.findedUser.role=="Admin"){
                    
                  localStorage.setItem("connectedUser",JSON.stringify(data.findedUser ));  
                  this.router.navigate([`home/admin`])
                  
                  // redirection vers admin
                }
                else if(data.findedUser.role=="Teacher"){
                  
                  localStorage.setItem("connectedUser",JSON.stringify(data.findedUser ));          
                  this.router.navigate([`home/teacher`]);
                 
                }
                else{
                  console.log(data.findedUser.id)
                  localStorage.setItem("connectedUser",JSON.stringify(data.findedUser ));
                  this.router.navigate([`home/student`]);
                
                }
              }
              else {console.log("Please Check your email or pass")
              console.log(data.findedUser);}
            }
    )
  }
 
}
