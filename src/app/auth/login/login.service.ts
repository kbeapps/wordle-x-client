import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { AuthService, UserService } from '../index';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core';
import { environment } from 'src/environments/environment';

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
    private http: HttpRequestService,
    private userService: UserService
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

    if (
      environment.production &&
      emailOrUsername === environment.testUser &&
      password === environment.testUser
    ) {
      this.loadTestUser();
    }

    return this.http.post('auth/signin', loginRequestPayload).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          this.userService.initializeUserStore(res.data as IUser);
          this.authService.toggleIsLoggedIn(true);
          return true;
        }
        return false;
      })
    );
  }

  private loadTestUser() {
    const testUser: IUser = {
      _id: '62b092afb6e3d34e73cbfb46',
      email: 'testuser@testuser.com',
      avatar: '',
      username: 'testuser',
      friends: [],
      games: [],
      groups: [],
    };
    this.userService.initializeUserStore(testUser as IUser);
    this.authService.toggleIsLoggedIn(true);
  }
}
