import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesUrl:string="http://localhost:3000/courses"
  constructor(private httpClient: HttpClient) { }
  getAllCourses(){
    return this.httpClient.get<{courses:any}>(this.coursesUrl);
  }
  addCourse(obj, img:File){
    let formData= new FormData();
    formData.append('training', obj.course.training);
    formData.append('trainer', obj.course.trainer);
    formData.append('teacherId', obj.userId); 
    formData.append('price', obj.course.price);
    formData.append('description', obj.course.description);
    formData.append('studentNbr', obj.course.studentNbr);
    formData.append('img', img);
    return this.httpClient.post<{msg:string}>(this.coursesUrl,formData);
  }
  getCoursesById(id){
    return this.httpClient.get<{course:any}>(`${this.coursesUrl}/${id}`);
  }
  getCoursesByPrice(price){
    return this.httpClient.post<{courses:any}>(`${this.coursesUrl}/search`,price);
  }
  getCoursesByPriceAndName(obj){
    return this.httpClient.post<{courses:any}>(`${this.coursesUrl}/searchByName`,obj);
  }
  deleteCourse(id){
    return this.httpClient.delete<{message:any}>(`${this.coursesUrl}/${id}`);
  }
  updateCourse(obj){
    return this.httpClient.put<{course:any}>(`${this.coursesUrl}/${obj._id}`,obj);
  }
  getCoursesByTeacherID(teacherId){
    return this.httpClient.get<{courses:any}>(`${this.coursesUrl}/search/${teacherId}`)
  }
  createCoursesReservation(courseResObj){
  return this.httpClient.post<{message:string}>(`${this.coursesUrl}/addReservation`,courseResObj)
  }
  // get coursesReservation by Student Id
  getcoursesReservation(id){
    return this.httpClient.get<{reservations:any}>(`http://localhost:3000/coursesreservations/${id}`)
  }
  addScoreQuiz(scoreTestObj){
    return this.httpClient.put<{message:string}>(`http://localhost:3000/coursesreservations/${scoreTestObj._id}`,scoreTestObj)
  }

}
