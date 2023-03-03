import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/types';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl  = "http://localhost:8080/login";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      Authorization : ''
    },),
    observe: 'response' as const
  };

  constructor(private http : HttpClient) { }

  login(login : Login){
    this.http.post(this.loginUrl, login, {observe : 'response'}).subscribe(
      response => {
        console.log(response.headers.get("Authorization"));
      }
    );
  }
}
