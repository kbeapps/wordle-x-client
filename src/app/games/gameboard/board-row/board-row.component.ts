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
      state('colored', style({ backgroundColor: '#4caf50' }), {
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
              backgroundColor: '#4caf50',
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
  @Input() guess: string[] = [];
  @Input() guessEvaluation: string[] = [];
  @Input() startAnimation: boolean = false;
  // @Input() animationPosition: number = -1;
  // public delayTimes: string = [];¸

  constructor() {}

  ngOnInit(): void {}

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

  public getDelay(index: number): string {
    return `${index * 300}ms`;
  }

  public startRowAnimation() {
    this.setState(true);
  }

}
