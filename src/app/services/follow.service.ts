import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl : string = 'http://localhost:8080/api/follows';
  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRlcnNvbmdhcmNlc2dhcmNpYUBnbWFpbC5jb20iLCJleHAiOjE2NzkyODYwMTIsIm5hbWUiOiJhbmRlci5fLmdnIn0.rRajQFoLIbpux5JUYNg9rLcBCe3oZs7w_ihQAuNv3t_X5CRIo24qrTLw9McOOoyuRfyNGFbvwnpo3Msliy6uEQ')
  };

  constructor(private http : HttpClient) { }


  getCountOfFollowers(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-followers/${id}`, {headers : this.options.headers});
  }

  getCountOfFollowing(id : number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count-following/${id}`, {headers : this.options.headers});
  }
}
