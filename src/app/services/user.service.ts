import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl  = 'http://localhost:8080/api/users';
  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRlcnNvbmdhcmNlc2dhcmNpYUBnbWFpbC5jb20iLCJleHAiOjE2NzkyODYwMTIsIm5hbWUiOiJhbmRlci5fLmdnIn0.rRajQFoLIbpux5JUYNg9rLcBCe3oZs7w_ihQAuNv3t_X5CRIo24qrTLw9McOOoyuRfyNGFbvwnpo3Msliy6uEQ')
  };

  constructor(private http : HttpClient) { }

  getUserProfile(id : number) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {headers : this.options.headers});
  }
}
