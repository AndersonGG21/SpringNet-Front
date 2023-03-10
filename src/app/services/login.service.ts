import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../models/types';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl  = "http://localhost:8080/login";
  private usersUrl = "http://localhost:8080/api/users"

  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRlcnNvbmdhcmNlc2dhcmNpYUBnbWFpbC5jb20iLCJleHAiOjE2NzkyODYwMTIsIm5hbWUiOiJhbmRlci5fLmdnIn0.rRajQFoLIbpux5JUYNg9rLcBCe3oZs7w_ihQAuNv3t_X5CRIo24qrTLw9McOOoyuRfyNGFbvwnpo3Msliy6uEQ')
  };
  constructor(private http : HttpClient) { }

  login(login : Login){
    this.http.post(this.loginUrl, login, {observe : 'response'}).subscribe(
      response => {
        console.log(response.headers.get("Authorization"));
      }
    );

    this.http.get<User>(`${this.usersUrl}/by-email/${login.email}`,{headers : this.options.headers}).subscribe((response) => {
      console.log(response);
    })
  }

}
