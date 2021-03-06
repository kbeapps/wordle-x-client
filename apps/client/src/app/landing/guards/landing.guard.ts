import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../../auth';
import { LoadService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class LandingGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private loadService: LoadService,
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
    if (!this.authService.isLoggedIn) {
      // set app ready
      this.loadService.appIsReady = true;
      // continue to path
      return true;
    }

    // else redirect to dashboard
    return this.router.parseUrl('/dashboard');
  }
}
