import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { CustomValidationService } from '../../shared/services';
import { LoginService } from './login.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private validationService: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(): void {
    this.isLoading = true;
    this.loginService
      .requestLogin(
        this.loginForm.value.emailOrUsername,
        this.loginForm.value.password
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {},
        error: (error) => (this.errorMessage = error.message),
      });
  }

  validateField(fieldKey: string): string {
    // // get error for fieldKey
    const errors: ValidationErrors | null =
      this.loginForm.controls?.[fieldKey]?.errors;
    return this.validationService.getErrorMessage(errors, fieldKey);
  }
}
