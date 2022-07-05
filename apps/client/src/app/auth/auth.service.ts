import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StoreService } from '../shared/services';

interface IAuthStore {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;
  private loggedInSubject = new Subject<boolean>();
  private authStore: IAuthStore = {
    loggedIn: false,
  };

  constructor(private router: Router, private storeService: StoreService) {
    this.initStore();
  }

  private initStore(): void {
    const authStore = this.storeService.getData('auth');
    if (authStore) {
      this.authStore = authStore as IAuthStore;
      return;
    }
  }

  public get isLoggedIn() {
    return this.authStore.loggedIn;
  }

  public toggleIsLoggedIn(login: boolean): void {
    this.authStore.loggedIn = login;
    this.loggedInSubject.next(this.authStore.loggedIn);

    if (!login) {
      this.router.navigateByUrl('login');
      this.storeService.clearData();
      return;
    }
    this.storeService.setData('auth', this.authStore);
    this.router.navigateByUrl('dashboard/play');
  }

  public watchIsLoggedIn(): Observable<any> {
    return this.loggedInSubject.asObservable();
  }
}
