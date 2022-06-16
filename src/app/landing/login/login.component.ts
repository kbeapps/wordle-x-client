import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private validationService: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onLogin(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loginService.requestLogin(
        this.loginForm.value.emailOrUsername,
        this.loginForm.value.password
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
    // // get error for fieldKey
    const errors: ValidationErrors | null =
      this.loginForm.controls?.[fieldKey]?.errors;
    return this.validationService.getErrorMessage(errors, fieldKey);
  }
}
