import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl  = 'http://localhost:8080/api/stories'

  constructor(private http : HttpClient, private cookie : CookieService) { }

  getStories() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${Number(this.cookie.get('uuid'))}`)
  }

  createStory(story : any) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/new-story`, story)
  }
}
