import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  getErrorMessage(errors: ValidationErrors | null, fieldKey: string): string {
    let error = '';
    if (errors) {
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
