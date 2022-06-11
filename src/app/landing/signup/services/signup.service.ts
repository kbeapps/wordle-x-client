import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IHttpResponse {
  message: string;
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
export class SignupService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  requestSignup(
    email: string,
    username: string,
    password: string
  ): Observable<object> {
    console.log('u: ', this.apiUrl);
    console.log('email: ', email);
    const response = this.http.post<object>(
      this.apiUrl + 'auth/signup',
      { email: email, username: username, password: password },
      httpOptions
    );

    console.log('response: ', response);
    return response;
  }
}
