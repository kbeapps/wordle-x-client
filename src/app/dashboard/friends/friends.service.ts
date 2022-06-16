import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IUser } from '../../core/models/user';
import { HttpRequestService, UserService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private userService: UserService,
    private http: HttpRequestService
  ) {}

  // private findUserId(key: string, emailOrUsername: string): Observable<string> {
  //   return this.http.get('user/get', key, emailOrUsername).pipe(
  //     catchError((error) => {
  //       // TODO intercept errors and return only error message in error handler
  //       throw new Error(error.message);
  //     }),
  //     map((res) => {
  //       if (res) {
  //         let user: User = res.data as User;
  //         return user._id;
  //       }
  //       return '';
  //     })
  //   );
  // }

  public sendFriendRequest(emailOrUsername: string) {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';
    let message = '';

    const recipientUserId = '';
    // const recipientUserId = this.findUserId(key, emailOrUsername);

    if (recipientUserId) {
      const requestingUsername = this.userService.user.username;
      message = `${requestingUsername} sent you a friend request!`;

      return this.http.patch('notification/create', {});
    }
    return;
  }

  public deleteFriend(userId: string) {
    return this.http.delete('user/update', userId);
  }
}
