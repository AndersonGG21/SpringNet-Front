import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  private cookieService = inject(CookieService);
  private router = inject(Router);

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

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/server-error']);
        return throwError(error);
      })
    );
  }
}

// I know there is a more optimal way to use interceptors which are functional interceptors, but my version of Angular is not compatible. For the next project I will use this option
