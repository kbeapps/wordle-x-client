import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import {
  state,
  style,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { invalidAnimation, revealAnimation, wonAnimation } from './animations';
import { Store } from '@ngrx/store';
import { getActiveGuesses } from '../../+state';
import { IGuess } from '@client/data-models';

@Component({
  selector: 'client-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss'],
  animations: [
    trigger('tileAnimationState', [
      state('colored', style({ backgroundColor: '{{color}}' }), {
        params: { color: '' },
      }),
      state('won', style({ backgroundColor: '{{color}}' }), {
        params: { color: '' },
      }),

      transition(
        'uncolored => colored',
        useAnimation(revealAnimation, {
          params: { delay: '{{delay}}', color: '{{color}}' },
        })
      ),

      transition(
        '* => invalid',
        useAnimation(invalidAnimation, {
          params: { delay: '{{delay}}' },
        })
      ),

      transition(
        'colored => won',
        useAnimation(wonAnimation, {
          params: { delay: '{{delay}}', color: '{{color}}' },
        })
      ),
    ]),
  ],
})
export class BoardRowComponent implements OnInit, OnDestroy {
  public state: 'uncolored' | 'colored' | 'invalid' | 'won' = 'uncolored';
  @Input() public guessIndex = -1;
  public guessSubscription$: Subscription = new Subscription();
  public guess: IGuess = {
    guess: [],
    evaluation: [],
  };

  public isWon = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.guessSubscription$ = this.store
      .select(getActiveGuesses)
      .pipe(
        map((guesses) => {
          this.guess = guesses[this.guessIndex];
          if (
            guesses[this.guessIndex].evaluation.every((char) => char !== '')
          ) {
            this.state = 'colored';
          }
        })
      )
      .subscribe((guesses) => guesses);
  }

  public getColor(evaluation: string): string {
    const colorState: string = evaluation;
    return this.state !== 'uncolored'
      ? colorState === 'correct'
        ? '#4caf50'
        : colorState === 'close'
        ? '#ffa000'
        : ''
      : '';
  }

  public getDelay(index: number): string {
    return `${index * 300}ms`;
  }

  public startAnimation(wonGame: boolean, isValidWord: boolean): void {
    if (!isValidWord) {
      this.state = 'invalid';
      return;
    }

    this.state = 'colored';
    this.isWon = false;
  }

  public finalizeState(): void {
    this.state = this.isWon
      ? 'won'
      : this.state !== 'colored'
      ? 'uncolored'
      : 'colored';
  }

  ngOnDestroy(): void {
    this.guessSubscription$.unsubscribe();
  }
}
