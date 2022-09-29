import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  teachersUrl:string="http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }
  getAllteachers(){
    return this.httpClient.get<{response:any}>(this.teachersUrl);
  }
  addteacher(obj){
    return this.httpClient.post(this.teachersUrl,obj);
  }
  getteachersById(id){
    return this.httpClient.get(`${this.teachersUrl}/${id}`);
  }
  deleteteacher(id){
    return this.httpClient.delete(`${this.teachersUrl}/${id}`);
  }
  updateteachers(obj){
    return this.httpClient.put(`${this.teachersUrl}/ ${obj.id}`,obj);
  }
}
