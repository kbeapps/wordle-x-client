import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from 'src/app/shared/utils/http-request.service';

interface ILoginPayload {
  email?: string;
  username?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpRequestService) {}

  requestLogin(emailOrUsername: string, password: string): Observable<object> {
    const loginRequestPayload: ILoginPayload = {
      password: password,
    };

    loginRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    return this.http.post('auth/signin', loginRequestPayload);
  }
}
