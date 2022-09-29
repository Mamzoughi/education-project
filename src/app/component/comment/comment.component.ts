import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() C: any;
 name:string
 
  constructor(private userService: UserService, ) { }

  ngOnInit() {
  
    
  
  }
  getName(id){
    this.userService.getUserById(id).subscribe(
      data=>{this.name= data.user.fName ,data.user.lName}
    )
   
  }
  

}
