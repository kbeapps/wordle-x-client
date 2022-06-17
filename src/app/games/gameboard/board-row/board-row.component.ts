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
      state(
        'colored',
        style({ height: '100px', opacity: 0.8, backgroundColor: 'blue' })
      ),
      // transition('uncolored => colored', [
      //   stagger('600ms', [
      //     animate('900ms', keyframes([

      //     ]) style({ transform: 'translateX(0)' })),
      //   ]),
      // ]),
    ]),
  ],
})
export class BoardRowComponent implements OnInit {
  coloredState: string = 'uncolored';
  guess: string[] = ['T', 'E', 'S', 'T', 'Y'];
  guessEvaluation: string[] = [
    'correct',
    'correct',
    'close',
    'close',
    'incorrect',
  ];
  constructor() {}

  ngOnInit(): void {}

  changeVisualState() {
    const colorState = this.coloredState;
    this.coloredState = colorState === 'uncolored' ? 'colored' : 'uncolored';

    console.log('changing visual state to: ', this.coloredState);
  }
}
