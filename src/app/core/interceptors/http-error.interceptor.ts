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
import { LoadService } from '../load.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private loadService: LoadService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe((source) => {
      return this.handleHttpErrors(source);
    });
  }

  handleHttpErrors(
    source: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.loadService.appHasError = true;
          return EMPTY;
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
