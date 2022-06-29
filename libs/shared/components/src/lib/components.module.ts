import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@client/shared/material/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './components/form/form.component';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { RequestButtonComponent } from './components/request-button/request-button.component';

const sharedComponents = [
  FormComponent,
  FormInputComponent,
  RequestButtonComponent,
];

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [sharedComponents],
  exports: [sharedComponents],
})
export class ComponentsModule {}
