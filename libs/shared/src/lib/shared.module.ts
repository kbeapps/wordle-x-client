import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@client/shared/components/src';
import { MaterialModule } from '@client/shared/material/src';

@NgModule({
  imports: [CommonModule, ComponentsModule, MaterialModule],
  exports: [ComponentsModule, MaterialModule],
})
export class SharedModule {}
