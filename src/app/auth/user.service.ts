import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, IUser } from 'src/app/core';
import { catchError, map } from 'rxjs';
import { HttpRequestService } from '../shared-services';
import { StoreService } from '../shared-services';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userStore: IUser = new User();
  private userSubject = new Subject<IUser>();
  constructor(
    private authService: AuthService,
    private http: HttpRequestService,
    private storeService: StoreService
  ) {}

  public get user(): IUser {
    return this.userStore;
  }

  private set user(user: IUser) {
    this.userStore = user;
    this.userSubject.next(this.user);
  }

  public initializeUserStore(user?: IUser): void {
    if (this.user._id) {
      return;
    }
    if (user) {
      this.user = user;
      this.storeService.setData('_id', this.user._id);
      return;
    }
    const userId = this.storeService.getData('_id', true);

    if (!userId) {
      this.authService.toggleIsLoggedIn(false);
      return;
    }

    this.requestUser('_id', String(userId)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
        }
      },
      error: (error) => this.authService.toggleIsLoggedIn(false),
    });
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
        _id: this.userStore._id,
        [updateField]: updateValue,
      })
      .pipe(
        catchError((error) => {
          throw new Error(error.message);
        }),
        map((res) => {
          this.user = res.data as IUser;
        })
      );
  }
}
