import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login, User } from '../models/types';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_LOGIN_URL  = "http://3.16.159.39:81/login";
  private API_USERS_URL = "http://3.16.159.39:81/api/users"
  private router = inject(Router);

  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
  };
  constructor(private http : HttpClient, private cookie : CookieService) { }

  login(login : Login){
    this.cookie.deleteAll();
    this.http.post<HttpResponse<any>>(this.API_LOGIN_URL, login, {observe : 'response', headers : this.options.headers}).subscribe(
      (response) => {
        const token = response.headers.get("Authorization");
        //console.log(token);
        //console.log(response);
        if (token != null){
          this.cookie.set("Bearer", token.replace("Bearer", "").trim());
        }
      }, error => {
        alert("Wrong username or password");
      }, () => {
        this.http.get<User>(`${this.API_USERS_URL}/by-email/${login.email}`,{headers : this.options.headers}).subscribe((response) => {
          const uuid = response.id;
          this.cookie.set("uuid", String(uuid));
          this.cookie.set("username", String(response.username));
          this.cookie.set("user_profile_picture", String(response.profileImg));

          if (this.cookie.get("Bearer") != "") {
            this.router.navigateByUrl("/feed").then(() => window.location.reload());
          }

        })
      }
    );
  }

  isLoggedIn() {
    if (!this.cookie.check("Bearer")) {
      this.router.navigate(['/not-logged']);
    }
  }

}
