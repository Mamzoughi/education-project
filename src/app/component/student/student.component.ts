import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  userList:any=[];
  id:string;
  constructor(private userService: UserService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserReservation(this.id).subscribe(
      data=>{console.log(data.reservations)
         for(var i=0; i<data.reservations.length;i++){
             this.userService.getUserById(data.reservations[i].userId).subscribe(
               response=>{this.userList.push(response.user)
               console.log(this.userList)
              }
             )
         }
      }
    )
  }
  }


