import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StoreService } from '../utils/store.service';

interface IAuthStore {
  loggedIn?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string | null = null;
  private subject = new Subject<any>();
  authStore: IAuthStore = {
    loggedIn: false,
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

  toggleIsLoggedIn(): void {
    // simulate until request is added
    const isLoggedIn: boolean = !this.authStore.loggedIn;
    this.authStore.loggedIn = isLoggedIn;
    this.subject.next(isLoggedIn);

    if (!isLoggedIn) {
      this.router.navigateByUrl('login');
      this.storeService.clearData();
      return;
    }
    this.storeService.setData('auth', this.authStore);
    this.router.navigateByUrl('dashboard');
  }

  watchIsLoggedIn(): Observable<any> {
    return this.subject.asObservable();
  }
}
