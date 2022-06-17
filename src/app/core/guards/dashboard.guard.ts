import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService, UserService } from 'src/app/auth';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn) {
      if (!this.userService.user._id) {
        this.userService.initializeUserStore();
      }
      return true;
    }
    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
}
