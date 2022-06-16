import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { AuthService } from '../../shared/services/auth.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [CustomValidationService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private signupService: SignupService,
    private validationService: CustomValidationService
  ) {}

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

  async onSignup(): Promise<void> {
    this.isLoading = true;
    try {
      await this.signupService.requestSignup(
        this.signupForm.value.email,
        this.signupForm.value.username,
        this.signupForm.value.password
      );
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      }
    } finally {
      this.isLoading = false;
    }
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
