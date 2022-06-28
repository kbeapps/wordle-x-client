import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthValidationService } from '../../services/auth-validation.service';
import { ILoginRequest, IUser } from '@client/data-models';
import { Observable } from 'rxjs';
import { getAuthLoading, getUser } from '../../+state/auth.selectors';
import { AuthActions } from '../../+state/auth.actions';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user$: Observable<IUser>;
  isLoading$: Observable<boolean>;
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private validationService: AuthValidationService,
    private store: Store
  ) {
    this.user$ = store.select(getUser);
    this.isLoading$ = store.select(getAuthLoading);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  isEmail(str: string): boolean {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
  }

  onLogin(): void {
    const emailOrUsername: string = this.loginForm.value.emailOrUsername;
    const password: string = this.loginForm.value.password;

    const loginPayload = this.isEmail(emailOrUsername)
      ? { email: emailOrUsername }
      : { username: emailOrUsername };

    const loginRequest: ILoginRequest = {
      ...loginPayload,
      password: password,
    };

    this.store.dispatch(AuthActions.login({ payload: loginRequest }));
  }

  validateField(fieldKey: string): string {
    // // get error for fieldKey
    const errors: ValidationErrors | null =
      this.loginForm.controls?.[fieldKey]?.errors;
    return this.validationService.getErrorMessage(errors, fieldKey);
  }
}
