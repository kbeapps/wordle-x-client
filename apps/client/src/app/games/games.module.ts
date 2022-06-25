import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core';
import { SharedModule } from '../shared/shared.module';

import { BoardRowComponent } from './gameboard/board-row/board-row.component';
import { GamesComponent } from './components/games.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { KeyboardComponent } from './gameboard/keyboard/keyboard.component';

@NgModule({
  declarations: [
    GamesComponent,
    GameboardComponent,
    KeyboardComponent,
    BoardRowComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule],
  exports: [GamesComponent],
})
export class GamesModule {}
