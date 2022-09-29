import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventsUrl:string="http://localhost:3000/events"
  constructor(private httpClient: HttpClient) { }
  getAllevents(){
    return this.httpClient.get<{events:any}>(this.eventsUrl);
  }
  addevent(obj, img:File){
    let formData= new FormData();
    formData.append('eventName', obj.event.eventName);
    formData.append('eventDescription', obj.event.eventDescription);
   
    formData.append('eventCreatorId', obj.eventCreatorId);
    formData.append('eventDate', obj.event.eventDate);
    formData.append('eventPlace', obj.event.eventPlace);
    formData.append('eventPrice', obj.event.eventPrice);
    formData.append('img', img);

    return this.httpClient.post<{msg:string}>(this.eventsUrl,formData);
  }
  geteventsById(id){
    return this.httpClient.get<{event:any}>(`${this.eventsUrl}/${id}`);
  }
  deleteevent(id){
    return this.httpClient.delete<{msg:string}>(`${this.eventsUrl}/${id}`);
  }
  updateevent(obj, img:File){
    let formData= new FormData();
    formData.append('id', obj._id);
    formData.append('eventName', obj.eventName);
    formData.append('eventDescription', obj.eventDescription);
    formData.append('eventDate', obj.eventDate);
   
    formData.append('eventPlace', obj.eventPlace);
    formData.append('eventPrice', obj.eventPrice);
    formData.append('img', img);
    return this.httpClient.put<{event:any}>(`${this.eventsUrl}/${obj._id}`,formData);
  }
  getEventsByNameAndDate(obj){
    return this.httpClient.post(`${this.eventsUrl}/search`, obj)
  }
  addEventReservation(obj){
    return this.httpClient.post<{message:string}>(`http://localhost:3000/eventsreservations`, obj)
  }
  getEventReservation(id){
    return this.httpClient.get<{reservations:any}>(`http://localhost:3000/eventsreservations/${id}`)
  }
}
