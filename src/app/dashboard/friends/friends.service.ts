import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpRequestService) {}

  findUserId(key: string, emailOrUsername: string): Observable<string> {
    return this.http.get('user/get', key, emailOrUsername).pipe(
      catchError((error) => {
        // TODO intercept errors and return only error message in error handler
        throw new Error(error.error.message);
      }),
      map((res) => {
        if (res) {
          res.data
          return '';
        }
        return '';
      })
    );
  }

  sendFriendRequest(emailOrUsername: string) {
    const key = emailOrUsername.includes('@') ? 'email' : 'username';

    return this.http.patch('notification/create', {});
  }

  deleteFriend(userId: string) {
    return this.http.delete('user/update', userId);
  }
}
