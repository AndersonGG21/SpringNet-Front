import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service/public-api';
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
  };
  constructor(private http : HttpClient, private cookie : CookieService) { }

  login(login : Login){
    this.http.post(this.loginUrl, login, {observe : 'response'}).subscribe(
      response => {
        console.log(response.headers.get("Authorization"));
        const token = response.headers?.get("Authorization");

        if (token != null) {
          this.cookie.set("Bearer", token.replace("Bearer", "").trim());
        }

      }
    );

    this.http.get<User>(`${this.usersUrl}/by-email/${login.email}`,{headers : this.options.headers}).subscribe((response) => {
      // console.log(response);
      console.log(response.id);
      const uuid = response.id;
      this.cookie.set("uuid", String(uuid));
      this.cookie.set("username", String(response.username))
    })
  }

}
