import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

import { invalidAnimation, revealAnimation, wonAnimation } from './animations';

@Component({
  selector: 'app-board-row',
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
export class BoardRowComponent implements OnInit {
  public state: 'uncolored' | 'colored' | 'invalid' | 'won' = 'uncolored';
  public won: boolean = false;
  @Input() guess: string[] = [];
  @Input() guessEvaluation: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.guess.every((item) => item !== '')) {
      this.startAnimation(false, true);
    }
  }

  public getColor(index: number): string {
    const colorState: string = this.guessEvaluation[index];
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
    this.won = wonGame;
  }
  public finalizeState(): void {
    this.state = this.won
      ? 'won'
      : this.state !== 'colored'
      ? 'uncolored'
      : 'colored';
  }
}
