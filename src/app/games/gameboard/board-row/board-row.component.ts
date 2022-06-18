import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import {
  animate,
  state,
  style,
  trigger,
  keyframes,
  transition,
} from '@angular/animations';

interface BoardRowChanges {
  startAnimation: { currentValue: boolean };
  animationPosition: { currentValue: boolean };
}

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
        animate(
          '2000ms {{delay}} ease-in-out',
          keyframes([
            style({
              transform: 'rotateY(0)',
              offset: 0,
            }),
            style({
              transform: ' rotateY(180deg)',
              offset: 0.5,
            }),
            style({
              transform: 'rotateY(360deg)',
              offset: 1,
              backgroundColor: '{{color}}',
            }),
          ])
        ),
        {
          params: { delay: '0ms', color: '' },
        }
      ),

      transition(
        'colored => won',
        animate(
          '2000ms {{delay}} ease-in-out',
          keyframes([
            style({
              transform: 'rotateY(0)',
              offset: 0,
            }),
            style({
              transform: 'scale(1.5) translateY(-25px)',
              offset: 0.5,
            }),
            style({
              transform: 'rotateY(360deg)',
              offset: 1,
              backgroundColor: '{{color}}',
            }),
          ])
        ),
        {
          params: { delay: '0ms', color: '' },
        }
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
