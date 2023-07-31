import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http : HttpClient) { }

  uploadFile(formData : FormData) : Observable<any>{
    return this.http.post('http://18.117.253.243/media/upload', formData);
  }
}
