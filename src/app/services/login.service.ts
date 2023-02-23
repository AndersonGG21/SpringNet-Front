import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from '../models/login.model';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl : string = "http://localhost:8080/login";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      Authorization : ''
    },),
    observe: 'response' as 'response'
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
