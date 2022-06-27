import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GameActions from './game.actions';
import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let actions: Observable<Action>;
  let effects: GameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GameEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GameActions.init() });

      const expected = hot('-a-|', {
        a: GameActions.loadGameSuccess({ game: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
