import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {
 role:string;
 visibility:string="4";
 displayAdmin:boolean=false;
 displayStudent:boolean=false;
 displayTeacher:boolean=false;
 displayMenu:boolean;
 connectedUser:any;
 displayIt:boolean=false;
 button:string="Login"
  constructor(private router:Router, private userService:UserService ) { }

  ngOnInit() {
    
    this.menuDislay()
    if(this.isLoged()){
      this.button="Logout";
      this.displayIt=true;
  }
      
}
ngDoCheck(): void {
  
    if(this.router.url=='/login') {this.displayMenu=false}
    else{this.displayMenu=true} 
    
}
 menuDislay(){
  this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"null";
  this.displayAdmin=(this.connectedUser.role=="Admin");
  this.displayStudent=(this.connectedUser.role=="Student");
  this.displayTeacher=(this.connectedUser.role=="Teacher");
 }

 isLoged(){

  this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
   if (this.connectedUser){ return true}
   else return false;
}
loginOrLogout(){
  alert(this.isLoged())
  if(this.isLoged() ){
    
    alert('Your session expired')
    localStorage.removeItem("connectedUser");
    location.reload()
  }
  else{
    
    this.router.navigate(['/login'])}
}
}

