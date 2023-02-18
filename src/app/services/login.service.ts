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


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



  login(login : Login){
    this.http.post(this.loginUrl, login, {observe : 'response'}).subscribe(
      response => {
        console.log(response.headers.get("Authorization"));
      }
    );
  }
}
