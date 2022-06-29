import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
  @Output() public emitChanges = new EventEmitter();

  writeValue(value: string) {}

  registerOnChange(fn: any) {
    this.emitChanges.emit('change');
  }

  registerOnTouched(fn: any) {
    this.emitChanges.emit('touched');
  }
}
