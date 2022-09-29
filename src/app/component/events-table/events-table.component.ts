import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {
  events:any=[];
  
  constructor(private router:Router, private eventsService:EventsService) { }

  ngOnInit() {
  //   this.events=[{id:"1",title:"Alternative data " ,dateStart:"01/06/2022",dateEnd:"10/06/2022", location:"5 New York City",hour:"8.30 - 10.30",price:"100"},
  //   {id:"2",title:"Student Debt" ,dateStart:"01/07/2022",dateEnd:"10/07/2022",location:"25 Brooklyn City",hour:"11.30 - 13.30",price:"560"} ,
  //   {id:"3",title:"Repaying your student" ,dateStart:"01/08/2022",dateEnd:"10/08/2022",location:"25 Brooklyn City",hour:"8.30 - 10.30",price:"290"},
  //   {id:"4",title:"financial inclusion" ,dateStart:"01/09/2022",dateEnd:"10/09/2022",location:"5 New York City",hour:"11.30 - 13.30", price:"600"}
  // ]
  this.eventsService.getAllevents().subscribe(
    (data)=>{this.events=data.events}
  )

  }
  toDisplay(id){
   this.router.navigate([`events/${id}`]);
  }
  toUpdate(id){
    this.router.navigate([`eventForm/${id}`]);
  }
  deleteEvent(id){
  this.eventsService.deleteevent(id).subscribe(
    data=>{console.log(data.msg)
      location.reload();
    }
  );
  }
}
