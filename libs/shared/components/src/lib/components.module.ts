import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@client/shared/material/src';
import { RequestButtonComponent } from './components/request-button/request-button.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [RequestButtonComponent],
  exports: [RequestButtonComponent],
})
export class ComponentsModule {}
