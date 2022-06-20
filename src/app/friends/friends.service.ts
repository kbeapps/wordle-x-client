import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models/user';
import { HttpRequestService } from '../shared/services';
import { UserService } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private userService: UserService,
    private http: HttpRequestService
  ) {}

  private getUserId(key: string, emailOrUsername: string): string {
    // implement
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

      // implement
      // this.userService.updateUser(requestingUser);
    }
  }
}
