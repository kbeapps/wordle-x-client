import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../+state/auth.actions';
import { getAuthLoading } from '../../+state/auth.selectors';
import { ISignupRequest } from '@client/data-models';
import { Observable } from 'rxjs';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'client-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles.scss'],
})
export class SignupComponent {
  public isLoading$: Observable<boolean> = this.store.select(getAuthLoading);
  // public isLoggedIn$: Observable<boolean>;
  public errorMessage = '';

  public signupForm = this.fb.group({
    detailForm: this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      username: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_.-]{5,20}$'),
      ]),
    }),
    passwordForm: this.fb.group(
      {
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$'),
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      { validators: this.doesMatchValidator() }
    ),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSignup(): void {
    const signupRequest: ISignupRequest = {
      email: this.signupForm.controls.detailForm.value.email || '',
      username: this.signupForm.controls.detailForm.value.username || '',
      password: this.signupForm.controls.passwordForm.value.password || '',
    };
    this.store.dispatch(AuthActions.signup({ payload: signupRequest }));
  }

  doesMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      const errors = password === confirmPassword ? null : { match: true };

      if (password && confirmPassword) {
        this.signupForm?.controls.passwordForm.controls.password.setErrors(
          errors
        );
        this.signupForm?.controls.passwordForm.controls.confirmPassword.setErrors(
          errors
        );
      }
      return errors;
    };
  }
}
