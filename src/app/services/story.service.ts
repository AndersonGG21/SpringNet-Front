import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl  = 'http://localhost:8080/api/stories'

  private options = {
    observe: 'response' as const,
    headers : new HttpHeaders()
    .set('Authorization', `Bearer ${this.cookie.get("Bearer")}`)
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  };
  constructor(private http : HttpClient, private cookie : CookieService) { }

  getStories() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${Number(this.cookie.get('uuid'))}`, {headers: this.options.headers})
  }

  createStory(story : any) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/new-story`, story, {headers: this.options.headers})
  }
}
