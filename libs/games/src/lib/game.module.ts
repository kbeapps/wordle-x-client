import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@client/shared';
import { GameRoutingModule } from './game-routing.module';
// import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import * as fromGame from './+state/game.reducer';
import { GameEffects } from './+state/game.effects';

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
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule,
    // StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.reducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  // exports: [GamesComponent],
})
export class GamesModule {}
