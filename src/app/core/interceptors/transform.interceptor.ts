import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class ResponsePayload {
  message: string = '';
  data: object = {};
}

@Injectable()
export class TransformInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          const body = new ResponsePayload();
          body.message = event.body.message;
          body.data = event.body.data;
          return event.clone({ body });
        }
        return event;
      })
    );
  }
}
