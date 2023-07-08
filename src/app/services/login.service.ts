import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service/public-api';
import { Login, User } from '../models/types';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl  = "http://localhost:8080/login";
  private usersUrl = "http://localhost:8080/api/users"
  private router = inject(Router);

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

      }, error => {
        alert("Wrong username or password");
      }, () => {
        this.http.get<User>(`${this.usersUrl}/by-email/${login.email}`,{headers : this.options.headers}).subscribe((response) => {
          const uuid = response.id;
          this.cookie.set("uuid", String(uuid));
          this.cookie.set("username", String(response.username));
          this.router.navigateByUrl(("/feed")).then(() => window.location.reload());
        })
      }
    );
  }

}
