import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private API_URL  = 'http://3.16.159.39:81/api/stories'

  constructor(private http : HttpClient, private cookie : CookieService) { }

  getStories() : Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${Number(this.cookie.get('uuid'))}`)
  }

  createStory(story : any) : Observable<any> {
    return this.http.post<any>(`${this.API_URL}/new-story`, story)
  }
}
