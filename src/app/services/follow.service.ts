import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Follow, User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private API_URL  = 'http://3.16.159.39/api/follows';


  constructor(private http : HttpClient, private cookie : CookieService) { }


  getCountOfFollowers(id : number): Observable<number>{
    return this.http.get<number>(`${this.API_URL}/count-followers/${id}`);
  }

  getCountOfFollowing(id : number): Observable<number>{
    return this.http.get<number>(`${this.API_URL}/count-following/${id}`);
  }

  setFollow(follow : Follow) : Observable<any> {
    return this.http.post<Follow>(`${this.API_URL}/follow-user`, follow)
  }

  checkFollow(follow : Follow) : Observable<number> {
    return this.http.post<any>(`${this.API_URL}/check-follow`, follow);
  }

  getFollowers(id : number) : Observable<User[]>{
    return this.http.get<User[]>(`${this.API_URL}/${id}/followers`);
  }

  getFollowings(id : number) : Observable<User[]>{
    return this.http.get<User[]>(`${this.API_URL}/${id}/followings`);
  }
}
