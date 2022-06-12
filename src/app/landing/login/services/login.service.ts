import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface ISigninPayload {
  email?: string;
  username?: string;
  password: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  requestLogin(emailOrUsername: string, password: string): Observable<object> {
    const signinRequestPayload: ISigninPayload = {
      password: password,
    };

    signinRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    return this.http.post<object>(
      this.apiUrl + 'auth/signin',
      signinRequestPayload,
      httpOptions
    );
  }
}
