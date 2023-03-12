import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Like, Post } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl  = 'http://localhost:8080/api/posts/'
  status = 0;

  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRlcnNvbmdhcmNlc2dhcmNpYUBnbWFpbC5jb20iLCJleHAiOjE2NzkyODYwMTIsIm5hbWUiOiJhbmRlci5fLmdnIn0.rRajQFoLIbpux5JUYNg9rLcBCe3oZs7w_ihQAuNv3t_X5CRIo24qrTLw9McOOoyuRfyNGFbvwnpo3Msliy6uEQ')
  };


  constructor(private http : HttpClient, private messageService : MessageService) { }

  createPost(post : Post) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}new-post`,post,this.options);
  }

  getPost(id : number) : Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}${id}`, {headers: this.options.headers});
  }

  getPostByUser(id : number) : Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}user-posts/${id}`, {headers: this.options.headers});
  }

  likePost(like : Like) : Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/posts/like`,like,this.options);
  }

  checkLike(like : Like) : Observable<number> {
    return this.http.post<number>(`${this.baseUrl}liked`, like ,{headers : this.options.headers});
  }
}
