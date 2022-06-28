import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@client/shared/components/src';
import { MaterialModule } from '@client/shared/material/src';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, ComponentsModule, FlexLayoutModule, MaterialModule],
  exports: [ComponentsModule, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
