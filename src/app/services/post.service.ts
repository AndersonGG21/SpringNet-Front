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

  /**
   * This function sends a HTTP POST request to create a new post with the provided data.
   * @param {Post} post - The post parameter is an object of type Post that contains the data for a new
   * post to be created. This object may contain properties such as title, content, author, date, etc.
   * @returns An Observable of type `any` is being returned.
   */
  createPost(post : Post) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}new-post`,post,this.options);
  }

  /**
   * This function returns an Observable of an array of Post objects retrieved from an HTTP GET request
   * with a specified ID and headers.
   * @param {number} id - The id parameter is a number that represents the unique identifier of a post.
   * It is used to retrieve a specific post from the server.
   * @returns An Observable of an array of Post objects is being returned. The data is obtained by
   * making an HTTP GET request to the URL formed by concatenating the `baseUrl` property of the class
   * with the `id` parameter passed to the function. The request is made with the headers specified in
   * the `options` property of the class.
   */
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
    return this.http.post<any>(`${this.baseUrl}comment`, comment, {headers: this.options.headers});
  }

  getPostLikes(post : number) : Observable<number> {
    return this.http.get<number>(`${this.baseUrl}${post}/likes`, {headers: this.options.headers});
  }

  savePost(post : Post) : Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/saved-posts/save-post`, post, {headers: this.options.headers});
  }

  getSavedPosts(userId : number) : Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/saved-posts/${userId}`, {headers: this.options.headers});
  }

  checkIfSaved(post : any) : Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/saved-posts/check`, post, {headers: this.options.headers});
  }

  getLikedPosts(userId : number) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}liked-posts/${userId}`, {headers: this.options.headers});
  }
}
