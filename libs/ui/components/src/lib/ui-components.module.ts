import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@client/ui/material';
import { RequestButtonComponent } from './components/request-button/request-button.component';

@NgModule({
  imports: [CommonModule, UiMaterialModule],
  declarations: [RequestButtonComponent],
  exports: [RequestButtonComponent],
})
export class UiComponentsModule {}
