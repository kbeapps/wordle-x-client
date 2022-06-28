import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api-url.token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  get<T>(route: string, paramKey: string, paramValue: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${route}/${paramKey}/${paramValue}`);
  }

  post<T, D>(route: string, data?: D): Observable<T> {
    return this.http.post<T>(this.apiUrl + route, data, httpOptions);
  }

  patch<T, D>(route: string, data?: D): Observable<T> {
    return this.http.patch<T>(this.apiUrl + route, data, httpOptions);
  }

  delete<T>(route: string, params: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${route}/${params}`, httpOptions);
  }
}
