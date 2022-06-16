import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StoreService } from './store.service';
import { User } from 'src/app/core';

interface IAuthStore {
  loggedIn: boolean;
  user
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;
  private subject = new Subject<any>();
  authStore: IAuthStore = {
    loggedIn: false,
    user: (User = new User()),
  };

  constructor(private router: Router, private storeService: StoreService) {
    this.initStore();
  }

  initStore(): void {
    const authStore = this.storeService.getData('auth');
    if (authStore) {
      this.authStore = authStore as IAuthStore;
      return;
    }
  }

  toggleIsLoggedIn(login: boolean): void {
    this.authStore.loggedIn = login;
    this.subject.next(this.authStore.loggedIn);

    if (!login) {
      this.router.navigateByUrl('login');
      this.storeService.clearData();
      return;
    }
    this.storeService.setData('auth', this.authStore);
    this.router.navigateByUrl('dashboard');
  }

  storeUser(user: User) {
    this.authStore.user = user;
  }

  watchIsLoggedIn(): Observable<any> {
    return this.subject.asObservable();
  }
}
