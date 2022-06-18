import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

import { revealAnimation, wonAnimation } from './animations';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss'],
  animations: [
    trigger('tileAnimationState', [
      state('uncolored', style({})),
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
        'colored => won',
        useAnimation(wonAnimation, {
          params: { delay: '{{delay}}', color: '{{color}}' },
        })
      ),

    ]),
  ],
})
export class BoardRowComponent implements OnInit {
  public state: 'uncolored' | 'colored' | 'won' = 'uncolored';
  public won: boolean = false;
  @Input() guess: string[] = [];
  @Input() guessEvaluation: string[] = [];

  constructor() {}

  ngOnInit(): void {}

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

  public startAnimation(wonGame: boolean): void {
    this.state = 'colored';
    this.won = wonGame;
  }
  public startWinAnimation(): void {
    if (this.won) {
      this.state = 'won';
    }
  }
}
