import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 
  adresse:string="http://localhost:3000/comments"
  constructor(private httpClient: HttpClient) { }

  addComment(obj){
    return this.httpClient.post<{msg:string}>(this.adresse, obj);
  }
  getAllComments(){
    return this.httpClient.get<{comments:any}>(this.adresse);
  }
}
