import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormValidationService } from '@client/shared/validation';

@Component({
  selector: 'client-form-input',
  templateUrl: './form-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() public formControl!: FormControl;
  @Input() public label = 'Form Field';
  @Input() public icon = 'icon';
  @Input() public name = '';
  @Input() public type = 'text';

  constructor(private validationService: FormValidationService) {}

  writeValue(value: string) {
    return;
  }

  registerOnChange(fn: any) {
    return;
  }

  registerOnTouched(fn: any) {
    return;
  }

  validateField(): string {
    const errors: ValidationErrors | null = this.formControl.errors;
    return this.validationService.getErrorMessage(errors, this.name);
  }
}
