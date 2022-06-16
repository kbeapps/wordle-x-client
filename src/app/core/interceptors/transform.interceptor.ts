import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseBody } from '../model';

@Injectable()
export class TransformInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          return throwError(() => new Error(error.message));
        }
        return error;
      }),
      map((event) => {
        if (event instanceof HttpResponse) {
          const body = new ResponseBody();
          body.message = event.body.message;
          body.data = event.body.data;
          return event.clone({ body });
        }
        return event;
      })
    );
  }
}
