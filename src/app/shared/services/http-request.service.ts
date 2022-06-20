import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IResponse {
  message: string;
  data: object;
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

  get(
    route: string,
    paramKey: string,
    paramValue: string
  ): Observable<IResponse> {
    return this.http.get<any>(
      `${this.apiUrl}${route}/${paramKey}/${paramValue}`
    );
  }

  post(route: string, payload: object): Observable<IResponse> {
    return this.http.post<any>(this.apiUrl + route, payload, httpOptions);
  }

  patch(route: string, payload: object): Observable<IResponse> {
    return this.http.patch<IResponse>(
      this.apiUrl + route,
      payload,
      httpOptions
    );
  }

  delete(route: string, params: string): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${this.apiUrl}${route}/${params}`,
      httpOptions
    );
  }
}
