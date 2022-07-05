import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@client/shared';
import { GameRoutingModule } from './game-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromGame from './+state/game.reducer';
import { GameEffects } from './+state/game.effects';

import {
  BoardRowComponent,
  GameboardComponent,
  GamesComponent,
  KeyboardComponent,
} from './components';

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
    SharedModule,
    StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.gameReducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  // exports: [GamesComponent],
})
export class GamesModule {}
