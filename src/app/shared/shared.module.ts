import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';

import { RequestButtonComponent } from './components/request-button/request-button.component';

@NgModule({
  declarations: [RequestButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [RequestButtonComponent],
})
export class SharedModule {}
