import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, IUser } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: IUser = new User();
  private userSubject = new Subject<IUser>();
  constructor() {}

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
}
