import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {
  animate,
  state,
  style,
  trigger,
  keyframes,
  transition,
} from '@angular/animations';

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
    ]),
  ],
})
export class BoardRowComponent implements OnInit {
  public state: boolean = false;
  public guess: string[] = ['T', 'E', 'S', 'T', 'Y'];
  public guessEvaluation: string[] = [
    'correct',
    'correct',
    'close',
    'close',
    'incorrect',
  ];
  public delayTimes: string[] = [];

  constructor() {}

  ngOnInit(): void {
    let delay: number = 0;
    for (const guess of this.guessEvaluation) {
      delay += 300;
      this.delayTimes.push(`${delay}ms`);
    }
  }

  public setState(state: boolean) {
    this.state = state;
  }

  public getColor(index: number): string {
    const colorState: string = this.guessEvaluation[index];
    return this.state
      ? colorState === 'correct'
        ? '#4caf50'
        : colorState === 'close'
        ? '#ffa000'
        : ''
      : '';
  }

  public startRowAnimation() {
    this.setState(true);
  }
}
