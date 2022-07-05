import { Component, Input, AfterViewChecked } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { invalidAnimation, revealAnimation, wonAnimation } from './animations';
import { Store } from '@ngrx/store';

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
export class BoardRowComponent implements AfterViewChecked {
  public state: 'uncolored' | 'colored' | 'invalid' | 'won' = 'uncolored';
  @Input() public guess: string[] = [];
  @Input() public evaluation: string[] = [];

  // TODO: Add is won from state
  public isWon = false;

  constructor(private store: Store) {}

  ngAfterViewChecked(): void {
    // TODO: Move animation to trigger from parent, resolve issue with data change after init
    if (this.evaluation.every((char) => char !== '')) {
      this.startAnimation(false, true);
    }
  }

  public getColor(index: number): string {
    const colorState: string = this.evaluation[index];
    return this.state !== 'uncolored'
      ? colorState === 'correct'
        ? '#4caf50'
        : colorState === 'close'
        ? '#ffa000'
        : '#424242'
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
    this.isWon = wonGame;
  }

  public finalizeState(): void {
    this.state = this.isWon
      ? 'won'
      : this.state !== 'colored'
      ? 'uncolored'
      : 'colored';
  }
}
