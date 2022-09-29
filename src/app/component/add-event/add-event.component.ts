import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Builder } from 'protractor';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  
  events:any=[];
  eventForm:FormGroup;
  path:string;
  findedEvent:any={};
  id:any;
  title:string="Add Event"
  imagePreview:any;
  eventCreatorId:string;
  margin:string="margin-top: 5%;";
  constructor(private addEventForm: FormBuilder, private activatedRoute: ActivatedRoute , private eventsService: EventsService, private router:Router) { }
   
  ngOnInit() {

  // this.eventsService.getAllevents().subscribe(
  //   data=>{ this.events= data}
  // )
   
    this.eventForm= this.addEventForm.group({_id:[''],eventName:[''],eventDescription:[''],eventDate:[''],eventPlace:[''],eventPrice:[''],img:[''],})
   
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.path=this.router.url;
  
   
    if(this.id){
      this.title="Update Event";
      this.eventsService.geteventsById(this.id).subscribe(
       data=>{ this.findedEvent= data.event;
        console.log(data.event);
        this.eventForm=this.addEventForm.group(
        
          {_id:this.findedEvent._id,
            eventName:this.findedEvent.eventName, 
            eventDescription:this.findedEvent.eventDescription,
            eventDate:moment(this.findedEvent.eventDate).format("yyyy-MM-DD"),
            // eventDate:(this.findedEvent.eventDate).getDate() + "-" + ((this.findedEvent.eventDate).getMonth() + 1) + "-" + (this.findedEvent.eventDate).getFullYear(),
            eventPlace:this.findedEvent.eventPlace,
            eventPrice:this.findedEvent.eventPrice,
      
            img:this.findedEvent.img,
        })
    
      console.log(this.eventForm.value.eventDate);
      
     

      
      }
      );
    }
   
      this.eventsService.geteventsById(this.id).subscribe();
      // this.eventForm=this.addEventForm.group({eventName:this.findedEvent.title,eventDateStart:this.findedEvent.dateStart,eventDateEnd:this.findedEvent.dateEnd, eventPlace:this.findedEvent.location, eventPrice:this.findedEvent.price})
    
  }
addOrEditEvent(){
  if(this.id){
    this.eventsService.updateevent(this.eventForm.value, this.eventForm.value.img).subscribe(
      data=>{
    
        // this.eventForm=data.event;
        // this.eventForm.value.img=data.event.img;
     
      }
    );
}
else{
  console.log(this.eventForm.value);
  this.eventCreatorId=JSON.parse(localStorage.getItem("connectedUser")).id;
  this.eventsService.addevent({event:this.eventForm.value, eventCreatorId:this.eventCreatorId}, this.eventForm.value.img,).subscribe(
  data=>{console.log(data.msg)}
  )
}}

onImageSelected (event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.eventForm .patchValue({ img: file });
  this.eventForm .updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string};
    reader.readAsDataURL(file);}
}
