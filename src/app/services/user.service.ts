import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL  = 'http://3.16.159.39:81/api/users';
  users : User[] = [];
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.userSubject.asObservable();

  constructor(private http : HttpClient, private cookies : CookieService) {

  }

  getUserProfile(id : number) : Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  getAllUsers() {
    this.http.get<User[]>(`${this.API_URL}`).pipe(
      map((users: User[]) => {
        this.userSubject.next(users);
      })
    ).subscribe();
  }

  createNewUser(user : User) : Observable<any> {
    return this.http.post<User>(`${this.API_URL}/new-user`, user);
  }
}
