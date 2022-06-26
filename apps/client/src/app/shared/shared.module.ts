import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestButtonComponent } from './components/request-button/request-button.component';

@NgModule({
  declarations: [RequestButtonComponent],
  imports: [CommonModule],
  exports: [RequestButtonComponent],
})
export class SharedModule {}
