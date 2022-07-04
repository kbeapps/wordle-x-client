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

  public getUser(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(`user/getbyid`);
  }

  public login(credentials: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse, ILoginRequest>(
      `auth/signin`,
      credentials
    );
  }

  public signup(details: ISignupRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse, ISignupRequest>(
      `auth/signup`,
      details
    );
  }
}
