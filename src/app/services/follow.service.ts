import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Follow, User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl  = 'http:/springnet-production.up.railway.app/api/follows';


  constructor(private http : HttpClient, private cookie : CookieService) { }


  getCountOfFollowers(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-followers/${id}`);
  }

  getCountOfFollowing(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-following/${id}`);
  }

  setFollow(follow : Follow) : Observable<any> {
    return this.http.post<Follow>(`${this.baseUrl}/follow-user`, follow)
  }

  checkFollow(follow : Follow) : Observable<number> {
    return this.http.post<any>(`${this.baseUrl}/check-follow`, follow);
  }

  getFollowers(id : number) : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/${id}/followers`);
  }

  getFollowings(id : number) : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/${id}/followings`);
  }
}
