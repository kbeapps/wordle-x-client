import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // test & implement with auth header
    return next.handle(request).pipe((source) => {
      return this.handleAuthErrors(source);
    });
  }

  handleAuthErrors(
    source: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // test with error status
          this.authService.toggleIsLoggedIn(false);
          return EMPTY;
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
