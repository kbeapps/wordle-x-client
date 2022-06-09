import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const material = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule {}
