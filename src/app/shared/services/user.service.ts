import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User = new User();
  private userSubject = new Subject<User>();
  constructor() {}

  public get user(): User {
    return this.currentUser;
  }

  public set user(user: User) {
    this.currentUser = user;
    this.userSubject.next(this.user);
  }

  public watchUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
