import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface ILoginPayload {
  email?: string;
  username?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private http: HttpRequestService
  ) {}

  public requestLogin(
    emailOrUsername: string,
    password: string
  ): Observable<boolean> {
    const loginRequestPayload: ILoginPayload = {
      password: password,
    };
    loginRequestPayload[emailOrUsername.includes('@') ? 'email' : 'username'] =
      emailOrUsername;

    return this.http.post('auth/signin', loginRequestPayload).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          this.authService.storeUser(res.data);
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }
}
