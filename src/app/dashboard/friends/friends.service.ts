import { AuthService } from '../../shared/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { User } from '../../core/model/user';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private authService: AuthService,
    private http: HttpRequestService
  ) {}

  private findUserId(key: string, emailOrUsername: string): Observable<string> {
    return this.http.get('user/get', key, emailOrUsername).pipe(
      catchError((error) => {
        // TODO intercept errors and return only error message in error handler
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          let user: User = res.data as User;
          return user._id;
        }
        return '';
      })
    );
  }

  public sendFriendRequest(emailOrUsername: string) {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';
    const userId = this.findUserId(key, emailOrUsername);
    let message = '';

    this.authService.authStore;

    message = `${userId} sent you a friend request!`;

    return this.http.patch('notification/create', {});
  }

  public deleteFriend(userId: string) {
    return this.http.delete('user/update', userId);
  }
}
