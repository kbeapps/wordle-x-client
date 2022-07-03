import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../+state/auth.actions';
import { getAuthLoading } from '../../+state/auth.selectors';
import { ILoginRequest } from '@client/data-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.scss'],
})
export class LoginComponent {
  public isLoading$: Observable<boolean> = this.store.select(getAuthLoading);
  public errorMessage = '';
  public loginForm = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  onLogin(): void {
    const emailOrUsername = this.loginForm.value.emailOrUsername || '';
    const password = this.loginForm.value.password || '';

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
}
