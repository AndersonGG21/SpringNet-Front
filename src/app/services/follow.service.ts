import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl : string = 'http://localhost:8080/api/follows';
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
}
