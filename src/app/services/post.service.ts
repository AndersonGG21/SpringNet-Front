import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Comment, Like, Post, SavedPost } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL  = 'http://3.16.159.39:81/api/posts/';
  private postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  public posts$: Observable<Post[]> = this.postSubject.asObservable();
  private savedPostsSubject: BehaviorSubject<SavedPost[]> = new BehaviorSubject<SavedPost[]>([]);
  public savedPosts$: Observable<SavedPost[]> = this.savedPostsSubject.asObservable();

  constructor(private http : HttpClient, private cookie : CookieService) {
  }

  /**
   * This function sends a HTTP POST request to create a new post with the provided data.
   * @param {Post} post - The post parameter is an object of type Post that contains the data for a new
   * post to be created. This object may contain properties such as title, content, author, date, etc.
   * @returns An Observable of type `any` is being returned.
   */
  createPost(post : Post) : Observable<any>{
    return this.http.post<any>(`${this.API_URL}new-post`,post);
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
    return this.http.get<Post[]>(`${this.API_URL}${id}`);
  }

  /**
   * The function `getPostByUser` retrieves posts by a specific user using their ID.
   * @param {number} id - The id parameter is a number that represents the user's id.
   * @returns an Observable of type Post[].
   */
  getPostByUser(id : number) : Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}user-posts/${id}`);
  }

  /**
   * The function `likePost` sends a HTTP POST request to the server to like a post.
   * @param {Like} like - The parameter "like" is of type "Like", which is an object representing a
   * like on a post.
   * @returns an Observable of type 'any'.
   */
  likePost(like : Like) : Observable<any> {
    return this.http.post<any>(`http://3.16.159.39:81/api/posts/like`,like);
  }

  /**
   * The function `checkLike` sends a HTTP POST request to the server with a `Like` object and returns
   * an `Observable` that emits a number.
   * @param {Like} like - The parameter "like" is of type "Like", which is an object representing a
   * like. It is being passed as the body of a POST request to the specified URL.
   * @returns an Observable of type number.
   */
  checkLike(like : Like) : Observable<number> {
    return this.http.post<number>(`${this.API_URL}liked`, like);
  }

  /**
   * The function `getComments` retrieves comments for a given post using an HTTP GET request.
   * @param {number} post - The post parameter is a number that represents the ID of a post.
   * @returns an Observable of type Comment[].
   */
  getComments(post : number) : Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}${post}/comments`);
  }

  /**
   * The function `commentPost` sends a HTTP POST request to the server with a comment object and
   * returns an Observable that emits a string response.
   * @param {Comment} comment - The comment object that will be posted to the server.
   * @returns an Observable of type string.
   */
  commentPost(comment : Comment) : Observable<string> {
    return this.http.post<any>(`${this.API_URL}comment`, comment);
  }

  /**
   * The function `getPostLikes` retrieves the number of likes for a specific post.
   * @param {number} post - The post parameter is a number that represents the ID or identifier of a
   * post.
   * @returns an Observable of type number.
   */
  getPostLikes(post : number) : Observable<number> {
    return this.http.get<number>(`${this.API_URL}${post}/likes`);
  }

  /**
   * The function `savePost` sends a HTTP POST request to the specified URL with the provided `post`
   * data.
   * @param {Post} post - The post parameter is of type Post, which represents a post object that will
   * be sent to the server.
   * @returns an Observable of type `any`.
   */
  savePost(post : Post) : Observable<any> {
    return this.http.post<any>(`http://3.16.159.39:81/api/saved-posts/save-post`, post);
  }

  /**
   * The function `getSavedPosts` retrieves saved posts for a given user ID from a specified API
   * endpoint.
   * @param {number} userId - The userId parameter is a number that represents the unique identifier of
   * a user. It is used to retrieve the saved posts for a specific user.
   * @returns an Observable of type 'any'.
   */
  getSavedPosts(userId : number) : Observable<any> {
    return this.http.get<any>(`http://3.16.159.39:81/api/saved-posts/${userId}`);
  }

  /**
   * The function `checkIfSaved` sends a POST request to the
   * `http://localhost:8080/api/saved-posts/check` endpoint with the `post` data and returns an
   * Observable of type `any`.
   * @param {any} post - The `post` parameter is of type `any`, which means it can be any type of
   * object.
   * @returns an Observable of type 'any'.
   */
  checkIfSaved(post : any) : Observable<any> {
    return this.http.post<any>(`http://3.16.159.39:81/api/saved-posts/check`, post);
  }

  /**
   * The function `getLikedPosts` retrieves the liked posts for a given user ID.
   * @param {number} userId - The userId parameter is a number that represents the unique identifier of
   * a user.
   * @returns an Observable of type 'any'.
   */
  getLikedPosts(userId : number) : Observable<any> {
    return this.http.get<any>(`${this.API_URL}liked-posts/${userId}`)
  };

  getUserLikedPosts() {
    this.http.get<Post[]>(`${this.API_URL}liked-posts/${this.cookie.get("uuid")}`).pipe(
      map((posts: Post[]) => {
        this.postSubject.next(posts);
      })
    ).subscribe();
  }

  getUserSavedPosts() {
    this.http.get<SavedPost[]>(`http://3.16.159.39:81/api/saved-posts/${this.cookie.get("uuid")}`).pipe(
      map((posts: SavedPost[]) => {
        this.savedPostsSubject.next(posts);
      })
    ).subscribe();
  }
}
