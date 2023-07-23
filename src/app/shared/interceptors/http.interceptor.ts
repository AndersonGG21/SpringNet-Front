import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  private cookieService = inject(CookieService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isMultipart = request.body instanceof FormData;

    let headers: HttpHeaders;
    if (isMultipart) {
      headers = new HttpHeaders(); // Leave headers empty for multipart
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookieService.get('Bearer')}`,
      });
    }

    const clonedRequest = request.clone({ headers });

    return next.handle(clonedRequest);
  }
}

// I know there is a more optimal way to use interceptors which are functional interceptors, but my version of Angular is not compatible. For the next project I will use this option
