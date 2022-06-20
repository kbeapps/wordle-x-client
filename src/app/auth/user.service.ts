import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, IUser } from 'src/app/core';
import { catchError, finalize, map } from 'rxjs';
import { HttpRequestService, StoreService } from '../shared/services';
import { AuthService } from './auth.service';
import { LoadService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userStore: IUser = new User();
  private userSubject = new Subject<IUser>();
  private loadIdentifier = 'userLoad';

  constructor(
    private authService: AuthService,
    private http: HttpRequestService,
    private loadService: LoadService,
    private storeService: StoreService
  ) {
    this.loadService.startLoad(this.loadIdentifier);
  }

  public get user(): IUser {
    return this.userStore;
  }

  private set user(user: IUser) {
    this.userStore = user;
    this.userSubject.next(this.user);
  }

  public initializeUserStore(user?: IUser): void {
    let isLoaded: boolean = false;

    if (!isLoaded && this.user._id) {
      isLoaded = true;
    }
    if (!isLoaded && user) {
      this.user = user;
      this.storeService.setData('_id', this.user._id);
      isLoaded = true;
    }
    const userId = this.storeService.getData('_id', true);

    if (!isLoaded && !userId) {
      this.authService.toggleIsLoggedIn(false);
      isLoaded = true;
    }

    if (!isLoaded) {
      this.requestUser('_id', String(userId))
        .pipe(finalize(() => this.loadService.finishLoad(this.loadIdentifier)))
        .subscribe({
          next: (res) => {
            if (res) {
              this.user = res;
            }
          },
          error: (error) => this.authService.toggleIsLoggedIn(false),
        });
    } else {
      this.loadService.finishLoad(this.loadIdentifier);
    }
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
