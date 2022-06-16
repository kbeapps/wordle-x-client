import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { AuthService, CustomValidationService } from '../../shared/services';
import { finalize } from 'rxjs/operators';
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

  onLogin() {
    this.isLoading = true;
    this.loginService
      .requestLogin(
        this.loginForm.value.emailOrUsername,
        this.loginForm.value.password
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {},
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
  }

  validateField(fieldKey: string): string {
    // // get error for fieldKey
    const errors: ValidationErrors | null =
      this.loginForm.controls?.[fieldKey]?.errors;
    return this.validationService.getErrorMessage(errors, fieldKey);
  }
}
