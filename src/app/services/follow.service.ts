import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Follow } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl  = 'http://localhost:8080/api/follows';
  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', `Bearer ${this.cookie.get("Bearer")}`)
  };

  constructor(private http : HttpClient, private cookie : CookieService) { }


  getCountOfFollowers(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-followers/${id}`, {headers : this.options.headers});
  }

  getCountOfFollowing(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-following/${id}`, {headers : this.options.headers});
  }

  setFollow(follow : Follow) : Observable<any> {
    return this.http.post<Follow>(`${this.baseUrl}/follow-user`, follow, {headers : this.options.headers})
  }

  checkFollow(follow : Follow) : Observable<number> {
    return this.http.post<any>(`${this.baseUrl}/check-follow`, follow ,{headers : this.options.headers});
  }
}
