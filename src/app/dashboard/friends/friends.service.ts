import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/utils/http-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpRequestService) {}

  // Check if a user exists before sending a friend request
  userExists(emailOrUsername: string): Observable<object> {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';

    return this.http.get('user/get', key, emailOrUsername);
  }

  // Send a friend request to a user
  sendFriendRequest(emailOrUsername: string): Observable<object> {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';
    return this.http.patch('notification/create', {});
  }

  // Deletes a user from friend list
  deleteFriend(userId: string) {
    return this.http.delete('user/update', userId);
  }
}
