import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IResponse {
  message?: string;
  data?: object;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get(route: string, paramKey: string, paramValue: string): Observable<object> {
    return this.http.get<IResponse>(
      `${this.apiUrl}${route}/${paramKey}/${paramValue}`
    );
  }

  post(route: string, payload: object): Observable<object> {
    return this.http.post<IResponse>(this.apiUrl + route, payload, httpOptions);
  }

  patch(route: string, payload: object): Observable<object> {
    return this.http.patch<object>(this.apiUrl + route, payload, httpOptions);
  }

  delete(route: string, params: string): Observable<object> {
    return this.http.delete<IResponse>(
      `${this.apiUrl}${route}/${params}`,
      httpOptions
    );
  }
}
