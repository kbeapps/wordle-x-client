import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '@client/data-models';
import { HttpRequestService } from '@client/core/http-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpRequestService) {}

  public login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse, ILoginRequest>(
      `auth/signin`,
      credentials
    );
  }
}
