import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor() {}

  doesMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value.password;
      const confirmPassword = control.value.confirmPassword;
      return password !== confirmPassword ? { match: false } : null;
    };
  }

  getErrorMessage(errors: ValidationErrors | null, fieldKey: string): string {
    let err: string = '';
    if (errors) {
      // return message for first error
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
    return err;
  }
}
