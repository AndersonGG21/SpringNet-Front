import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Comment, Like, Post } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl  = 'http://localhost:8080/api/posts/'
  status = 0;

  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', `Bearer ${this.cookie.get("Bearer")}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  };


  constructor(private http : HttpClient, private messageService : MessageService, private cookie : CookieService) { }

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

  getComments(post : number) : Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}${post}/comments`, {headers : this.options.headers});
  }

  commentPost(comment : Comment) : Observable<string> {
    return this.http.post<any>(`${this.baseUrl}comment`, comment, {headers: this.options.headers})
  }

  getPostLikes(post : number) : Observable<number> {
    return this.http.get<number>(`${this.baseUrl}${post}/likes`, {headers: this.options.headers});
  }
}
