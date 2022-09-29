import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
 
  adresse:string="http://localhost:3000/quizs"
  constructor(private httpClient: HttpClient) { }

  addQuiz(obj){
    
    return this.httpClient.post<{msg:string}>(this.adresse,obj);
  }

  getQuizByCourseId(id){
    return this.httpClient.get<{quizs:any}>(`${this.adresse}/${id}`);
  }
  addQuizResponse(obj){
    return this.httpClient.post<{msg:string}>("http://localhost:3000/realisedQuizs",obj);
  }
  getQuizResultByStudentId(id){
    return this.httpClient.get<{result:any}>(`http://localhost:3000/realisedQuizs/${id}`)
  }
  getAllQuizByStudentId(id){
    return this.httpClient.get<{result:any}>(`http://localhost:3000/allrealisedQuizs/${id}`)
  }

}
