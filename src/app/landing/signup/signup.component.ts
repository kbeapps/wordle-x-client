import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

enum Keys {
  'email',
  'username',
  'password',
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9_.-]{5,20}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$'),
    ]),

    confirmPassword: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.signupForm);
  }

  getErrors(fieldKey: string, errors: ValidationErrors | null): string {
    let err: string = '';

    if (fieldKey === 'confirmPassword') {
      const doesMatch =
        this.signupForm.value.password ===
        this.signupForm.value.confirmPassword;

      if (!doesMatch) {
        this.signupForm.controls.confirmPassword.setErrors({
          doesMatch: false,
        });
        err = 'confirmation does not match password';
      }
    }

    if (fieldKey !== 'confirmPassword' && errors) {
      for (const key in errors) {
        switch (key) {
          case 'email':
            err = 'invalid email address';
            break;
          case 'required':
            err = `${fieldKey}: field required`;
            break;
          case 'minlength':
            err = `minimum allowed length: ${errors[key].requiredLength}`;
            break;
          case 'maxlength':
            err = `maximum allowed length: ${errors[key].requiredLength}`;
            break;

          case 'pattern':
            err = `allowed characters: ${errors[key].requiredPattern}`;
            break;

          default:
            err = `${fieldKey}: invalid input`;
            break;
        }

        break;
      }
    }
    return err;
  }
}
