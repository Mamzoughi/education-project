import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;
  event: any = {};
  events: any = [];
  result: any;
  eventId: any;
  path: string;
  userId:string;
  eventsTab:any=[];
  connectedUser:any;
  visible:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private router:Router
  ) {}

  ngOnInit() {
    //   this.events=[{id:"1",title:"Alternative data " ,dateStart:'2022-06-06',dateEnd:'2022-06-17', location:"5 New York City",hour:"8.30 - 10.30",price:"100"},
    //   {id:"2",title:"Student Debt" ,dateStart:'2022-06-06',dateEnd:'2022-10-01',location:"25 Brooklyn City",hour:"11.30 - 13.30",price:"560"} ,
    //   {id:"3",title:"Repaying your student" ,dateStart:'2022-08-01',dateEnd:'2022-08-10',location:"25 Brooklyn City",hour:"8.30 - 10.30",price:"290"},
    //   {id:"4",title:"financial inclusion" ,dateStart:'2022-09-01',dateEnd:'2022-09-10',location:"5 New York City",hour:"11.30 - 13.30", price:"600"}
    // ]
    this.eventsService.getAllevents().subscribe((data) => {
      this.events = data.events;
      console.log(this.events[0].img);
      
    });
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"))||"indefined";
    this.userId=this.connectedUser.id;
   this.path=this.router.url;
   this.eventId = this.activatedRoute.snapshot.paramMap.get("id");
   if(this.path=="/events"){this.visible=true}
    
   if(this.path=="/eventsReservation"){
    this.eventsService.getEventReservation(this.userId).subscribe(
      data=>{ 
      console.log(data.reservations)
        if(data.reservations){
          for(var i=0; i< data.reservations.length; i++){
            this.eventsService.geteventsById(data.reservations[i].eventId).subscribe(
              data=>{
                this.eventsTab.push(data.event); });
                
        }
        this.events=this.eventsTab
    console.log(this.events)
    }});
   }
    if (this.eventId) {
      this.eventsService.geteventsById(this.eventId).subscribe((data) => {
        this.events = [data.event];
        console.log(data.event.img);
      });
    }
  }
  eventSearch(){
    this.eventsService.getEventsByNameAndDate(this.event).subscribe();
  }
}
