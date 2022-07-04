import {
  animate,
  animation,
  style,
  keyframes,
} from '@angular/animations';

export const revealAnimation = animation(
  [
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
  ],
  { params: { color: '{{color}}', delay: '{{delay}}' } }
);
