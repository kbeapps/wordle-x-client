import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { HttpRequestService, UserService, NotificationService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private notificationService: NotificationService;
    private userService: UserService,
    private http: HttpRequestService
  ) {}

  private getUserId(key: string, emailOrUsername: string): string {
    const user: IUser = this.userService.getUser(key, emailOrUsername); 
    if(user) {
      return '';
    }
    return '';
  }

  public sendFriendRequest(emailOrUsername: string) {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';
    let message = '';

    const recipientUserId = this.getUserId(key, emailOrUsername);

    if (recipientUserId) {
      const requestingUsername = this.userService.user.username;
      message = `${requestingUsername} sent you a friend request!`;

      return this.http.patch('notification/create', {});
    }
    return;
  }

  public deleteFriend(friendId: string): void {
    const requestingUser: IUser = this.userService.user;

    if (requestingUser.friends.includes(friendId)) {
      requestingUser.friends.filter((friend) => {
        return friend !== friendId;
      });

      this.userService.updateUser(requestingUser);
    }
  }
}
