import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/validators/custom-validation.service';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [CustomValidationService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private validationService: CustomValidationService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl('test12', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_.-]{5,20}$'),
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.!@$%&(){}:;<>,?+=|-]{5,20}$'),
        this.validationService.doesMatchValidator,
      ]),
      confirmPassword: new FormControl('123456', [Validators.required]),
    });

    this.signupForm.addValidators(this.validationService.doesMatchValidator());
  }

  onSignup(): void {
    console.log('SUBMITTING!');
    console.log(this.signupForm);

    this.signupService
      .requestSignup(
        this.signupForm.value.email,
        this.signupForm.value.username,
        this.signupForm.value.password
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  validateField(fieldKey: string): string {
    const password: string = this.signupForm.value.password;
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

    // // get error for fieldKey
    const errors: ValidationErrors | null =
      this.signupForm.controls?.[fieldKey]?.errors;
    return this.validationService.getErrorMessage(errors, fieldKey);
  }
}
