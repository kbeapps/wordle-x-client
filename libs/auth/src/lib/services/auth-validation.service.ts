import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthValidationService {
  doesMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value.password;
      const confirmPassword = control.value.confirmPassword;
      return password !== confirmPassword ? { match: false } : null;
    };
  }

  getErrorMessage(errors: ValidationErrors | null, fieldKey: string): string {
    let error = '';
    if (errors) {
      // return message for first error
      for (const key in errors) {
        switch (key) {
          case 'email':
            error = 'invalid email address';
            break;
          case 'required':
            error = `${fieldKey}: field required`;
            break;
          case 'minlength':
            error = `minimum allowed length: ${errors[key].requiredLength}`;
            break;
          case 'maxlength':
            error = `maximum allowed length: ${errors[key].requiredLength}`;
            break;
          case 'pattern':
            error = `allowed characters: ${errors[key].requiredPattern}`;
            break;
          case 'match':
            error = `confirm password does not match password`;
            break;

          default:
            error = `${fieldKey}: invalid input`;
            break;
        }
        break;
      }
    }
    return error;
  }
}
