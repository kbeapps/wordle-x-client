import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { IAuthState, getIsLoggedIn, AuthActions } from '@client/auth/src';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingGuard implements CanActivate {
  constructor(private store: Store<IAuthState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url: string = state.url;

    return this.store.select(getIsLoggedIn).pipe(
      map((loggedIn) => {
        if (loggedIn) {
          this.store.dispatch(AuthActions.loggedInRedirect());
          return false;
        }
        return true;
      })
    );
  }
}
