import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  userUrl:string="http://localhost:3000/users"
  constructor(private http:HttpClient) { }
//  addUser
signupUser(obj,img:File){
 let formData= new FormData();
 formData.append('firstName', obj.user.firstName);
 formData.append('lastName', obj.user.lastName);
 formData.append('email', obj.user.email);
 formData.append('gender', obj.user.gender);
 formData.append('password', obj.user.password);
 formData.append('speciality', obj.user.speciality);
 formData.append('score', obj.user.score);
 formData.append('scoreQuiz', obj.user.scoreQuiz);
 formData.append('note', obj.user.note);
 formData.append('cin', obj.user.cin);
 formData.append('tel', obj.user.tel);
 formData.append('path', obj.path);
 formData.append('img', img);
return this.http.post<{msg:any}>(`${this.userUrl}/signup`,formData);
}

loginUser(obj){
  return this.http.post<{msg: string,findedUser:any}>(`${this.userUrl}/login`, obj); 
}
deleteUser(id){
 return this.http.delete<{msg:string}>(`${this.userUrl}/${id}`);
}
getUserById(id){
  return this.http.get<{ user:any}>(`${this.userUrl}/${id}`);
}
updateUser(obj,img:File){
  let formData= new FormData();
  formData.append('id', obj._id); 
 formData.append('firstName', obj.firstName);
 formData.append('lastName', obj.lastName);
 formData.append('email', obj.email);
 formData.append('gender', obj.gender);
 formData.append('password', obj.password);
 formData.append('speciality', obj.speciality);
 formData.append('score', obj.score);
 formData.append('scoreTest', obj.scoreQuiz);
 formData.append('note', obj.note);
 formData.append('cin', obj.cin);
 formData.append('tel', obj.tel);

 formData.append('img', img);
return this.http.put<{user:any}>(`${this.userUrl}/${obj._id}`,formData);
}
displayUsers(){
  return this.http.get<{ users:any}>(this.userUrl);
}
getUserReservation(id){
  return this.http.get<{reservations:any}>(`http://localhost:3000/usersreservations/${id}`)
}
// get reservation by Id
getReservationById(reservationId){
  return this.http.get<{ reservation:any}>(`http://localhost:3000/reservations/${reservationId}`);
}
updateReservation(reservationObj){
  return this.http.put(`http://localhost:3000/reservations/${reservationObj._id}`,reservationObj)
}




}
