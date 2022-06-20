import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BoardRowComponent } from './gameboard/board-row/board-row.component';
import { GamesComponent } from './games.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { KeyboardComponent } from './gameboard/keyboard/keyboard.component';

@NgModule({
  declarations: [
    GamesComponent,
    GameboardComponent,
    KeyboardComponent,
    BoardRowComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [GamesComponent],
})
export class GamesModule {}
