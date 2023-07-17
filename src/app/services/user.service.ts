import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl  = 'http://localhost:8080/api/users';

  constructor(private http : HttpClient, private cookies : CookieService) { }

  getUserProfile(id : number) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  createNewUser(user : User) : Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/new-user`, user);
  }
}
