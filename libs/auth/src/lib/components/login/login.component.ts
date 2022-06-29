import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ILoginRequest, IUser } from '@client/data-models';
import { Observable, map } from 'rxjs';
import {
  getAuthLoading,
  getIsLoggedIn,
  getUser,
} from '../../+state/auth.selectors';
import { AuthActions } from '../../+state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public user$: Observable<IUser>;
  public isLoading$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean>;

  public errorMessage = '';

  public loginForm = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private router: Router) {
    this.user$ = store.select(getUser);
    this.isLoading$ = store.select(getAuthLoading);
    this.isLoggedIn$ = store.select(getIsLoggedIn).pipe(
      map((res) => {
        if (res) {
          this.router.navigateByUrl('dashboard');
        }
        return res;
      })
    );
  }

  onLogin(): void {
    const emailOrUsername = this.loginForm.value.emailOrUsername;
    const password = this.loginForm.value.password;
    if (!emailOrUsername || !password) {
      return;
    }
    const loginPayload = this.isEmail(emailOrUsername)
      ? { email: emailOrUsername }
      : { username: emailOrUsername };
    const loginRequest: ILoginRequest = {
      ...loginPayload,
      password: password,
    };
    this.store.dispatch(AuthActions.login({ payload: loginRequest }));
  }

  isEmail(str: string): boolean {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
  }

  onTest() {
    console.log('test: ', this.loginForm);
  }
}
