import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from 'src/app/shared/utils/http-request.service';

interface ISignupPayload {
  email: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpRequestService) {}

  requestSignup(
    email: string,
    username: string,
    password: string
  ): Observable<object> {
    const signupRequestPayload: ISignupPayload = {
      email: email,
      username: username,
      password: password,
    };

    return this.http.post('auth/signup', signupRequestPayload);
  }
}
