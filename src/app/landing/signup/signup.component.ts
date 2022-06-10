import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/validators/custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [CustomValidationService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private validationService: CustomValidationService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
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
        this.validationService.doesMatchValidator,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.signupForm.addValidators(this.validationService.doesMatchValidator());
  }

  onSubmit(): void {
    console.log('SUBMITTING!');
    console.log(this.signupForm);
  }

  getErrors(fieldKey: string): string {
    let err: string = '';

    if (fieldKey === 'confirmPassword' || fieldKey === 'password') {
      // check if password matches confirmPassword
      const passwordIsValid =
        this.signupForm.value.password ===
        this.signupForm.value.confirmPassword;

      // set Validation Error if not valid, null if is
      this.signupForm.controls?.['confirmPassword'].setErrors(
        !passwordIsValid ? { match: false } : null
      );
    }

    const errors: ValidationErrors | null =
      this.signupForm.controls?.[fieldKey]?.errors;

    console.log('key: ', fieldKey, '\n error: ', errors);
    if (errors) {
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
          case 'match':
            err = `confirm password does not match password`;
            break;

          default:
            err = `${fieldKey}: invalid input`;
            break;
        }

        break;
      }
    }
    console.log(this.signupForm);
    console.log('err: ', err);
    return err;
  }
}
