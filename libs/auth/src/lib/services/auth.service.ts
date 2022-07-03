import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import {
  IAuthResponse,
  ILoginRequest,
  ISignupRequest,
  IUser,
} from '@client/data-models';
import { HttpRequestService } from '@client/shared/http-client';
import { getData } from '@client/shared/local-store';
import { loggedInKey } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpRequestService) {}

  public initialize(): Observable<IUser> {
    console.log('init');
    const isLoggedIn = getData(loggedInKey);
    console.log('isLoggedIn: ', isLoggedIn);
    return this.http
      .get<IAuthResponse>(`user/getbyid`)
      .pipe(map((response) => response.data));
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
