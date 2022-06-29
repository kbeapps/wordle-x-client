import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';

@Component({
  selector: 'client-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  field = '';
  form = this.fb.group({
    emailOrUsername: new FormControl('', [Validators.required]),
    password: '',
  });
  @ViewChild('formInput') inputComponent!: FormInputComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('init');
  }

  onChanges(event: Event) {
    console.log('event: ', event);
    this.form.value.emailOrUsername = String(event);
    console.log('form: ', this.form);
  }

  onTest() {
    console.log('test: ', this.form);
  }
}
