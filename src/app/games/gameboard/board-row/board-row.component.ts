import { Component, OnInit } from '@angular/core';
import {
  animate,
  stagger,
  state,
  style,
  trigger,
  keyframes,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss'],
  animations: [
    trigger('rowAnimationState', [
      state('uncolored', style({})),
      state('correct', style({ backgroundColor: '#4caf50' })),
      state('close', style({ backgroundColor: '#ffa000' })),
      state('incorrect', style({ backgroundColor: '#212121' })),
      transition(
        'uncolored => correct',
        animate(
          '2000ms',
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
        )
      ),
      transition(
        'uncolored => close',
        animate(
          '2000ms',
          keyframes([
            style({ transform: 'rotateY(0)', offset: 0 }),
            style({
              transform: ' rotateY(180deg)',
              offset: 0.5,
            }),
            style({
              transform: 'rotateY(360deg)',
              offset: 1,
              backgroundColor: '#ffa000',
            }),
          ])
        )
      ),
      transition(
        'uncolored => incorrect',
        animate(
          '2000ms',
          keyframes([
            style({ transform: 'rotateY(0)', offset: 0 }),
            style({
              transform: ' rotateY(180deg)',
              offset: 0.5,
            }),
            style({
              transform: 'rotateY(360deg)',
              offset: 1,
              backgroundColor: '#212121',
            }),
          ])
        )
      ),
    ]),
  ],
})
export class BoardRowComponent implements OnInit {
  private state: boolean = false;
  public guess: string[] = ['T', 'E', 'S', 'T', 'Y'];
  private guessEvaluation: string[] = [
    'correct',
    'correct',
    'close',
    'close',
    'incorrect',
  ];
  constructor() {}

  ngOnInit(): void {}

  public set coloredState(state: boolean) {
    this.state = state;
  }

  getColorState(index: number): string {
    return this.state ? this.guessEvaluation[index] : 'uncolored';
  }

  changeVisualState() {
    this.state = !this.state;
  }
}
