import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthActions, getIsLoggedIn, IAuthState } from '@client/auth/src';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private store: Store<IAuthState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url: string = state.url;

    return this.store.select(getIsLoggedIn).pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(AuthActions.logout());
          return false;
        }
        return true;
      })
    );
  }
}
