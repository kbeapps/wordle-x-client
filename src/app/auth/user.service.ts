import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, IUser } from 'src/app/core';
import { catchError, map } from 'rxjs';
import { HttpRequestService } from '../shared-services';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: IUser = new User();
  private userSubject = new Subject<IUser>();
  constructor(private http: HttpRequestService) {}

  public get user(): IUser {
    return this.currentUser;
  }

  public set user(user: IUser) {
    this.currentUser = user;
    this.userSubject.next(this.user);
  }

  public watchUser(): Observable<IUser> {
    return this.userSubject.asObservable();
  }

  public requestUser(
    searchBy: string,
    searchFor: string
  ): Observable<IUser | void> {
    return this.http.get('user/get', searchBy, searchFor).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => res.data as IUser)
    );
  }

  public requestUserUpdate(
    updateField: string,
    updateValue: any
  ): Observable<IUser | void> {
    return this.http
      .patch('user/update', {
        _id: this.currentUser._id,
        [updateField]: updateValue,
      })
      .pipe(
        catchError((error) => {
          throw new Error(error.message);
        }),
        map((res) => res.data as IUser)
      );
  }
}
