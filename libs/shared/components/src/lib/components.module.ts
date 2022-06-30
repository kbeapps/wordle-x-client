import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@client/shared/material/src';
import { ReactiveFormsModule } from '@angular/forms';

import { FormInputComponent } from './components/form-input/form-input.component';
import { RequestButtonComponent } from './components/request-button/request-button.component';

const sharedComponents = [FormInputComponent, RequestButtonComponent];

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [sharedComponents],
  exports: [sharedComponents],
})
export class ComponentsModule {}
