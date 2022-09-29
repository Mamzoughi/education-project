import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
 
  @Input() E:any;
  path:string;  
  button:boolean=false;
  userId:string;
  errorMsg:string="";
  connectedUser:any;
  constructor(private router:Router, private eventService: EventsService) { }

  ngOnInit() {
    // this.E.img=this.E.img.split(' http://localhost:3000').join('bakend');
    // console.log(this.E.img)
    // this.path=this.router.url;
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"indefined";
    if(this.connectedUser.role=="Student"){this.button=true}
    
  }
  styling(price:any){
  if(price>0 && price<500){return 'orange'}
  else if(price >= 500 && price<1000){return 'blue'}
  else return 'red';
  }
  participateToEvent(E){
   
    this.userId=this.connectedUser.id;
    this.eventService.getEventReservation(this.userId).subscribe(
      data=>{
        if  (data.reservations.find(obj=>{return obj.eventId == E._id}) ){this.errorMsg="You have Already reserved"}
        else{ 
          this.eventService.addEventReservation({userId:this.userId, eventId:E._id}).subscribe(
            data=>{
               if(data.message == "1"){this.errorMsg="Reservation Added with succes"}
       
            });}
  })
   
  }
}
