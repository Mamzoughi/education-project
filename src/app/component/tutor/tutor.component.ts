import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  @Input() T:any;
  comment:any={};
  button:boolean=false;
  connectedUser:any;
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }
  addingComment(){
   this.button=true;
  }
  giveOpinion(teacherId){
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"undefined";
   this.commentService.addComment({comment:this.comment, teacherId:teacherId, userId:this.connectedUser.id}).subscribe(
   )
   console.log (this.comment)
  }
}
