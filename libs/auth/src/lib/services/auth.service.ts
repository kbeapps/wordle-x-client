import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAuthResponse,
  ILoginRequest,
  ISignupRequest,
} from '@client/data-models';
import { HttpRequestService } from '@client/shared/http-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpRequestService) {}

  public login(credentials: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse, ILoginRequest>(
      `auth/signin`,
      credentials
    );
  }

  public signup(details: ISignupRequest): Observable<IAuthResponse> {
    console.log('signup');
    return this.http.post<IAuthResponse, ISignupRequest>(
      `auth/signup`,
      details
    );
  }
}
