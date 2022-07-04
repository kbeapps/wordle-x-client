import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api-url.token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  public get<T>(
    route: string,
    paramKey?: string,
    paramValue?: string
  ): Observable<T> {
    if (paramKey && paramValue) {
      return this.http.get<T>(
        `${this.apiUrl}${route}/${paramKey}/${paramValue}`,
        httpOptions
      );
    }
    return this.http.get<T>(this.apiUrl + route, httpOptions);
  }

  public post<T, D>(route: string, data?: D): Observable<T> {
    return this.http.post<T>(this.apiUrl + route, data, httpOptions);
  }

  public patch<T, D>(route: string, data?: D): Observable<T> {
    return this.http.patch<T>(this.apiUrl + route, data, httpOptions);
  }

  public delete<T>(route: string, params: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${route}/${params}`, httpOptions);
  }
}
