import { animate, animation, style, keyframes } from '@angular/animations';

export const invalidAnimation = animation([
  animate(
    '500ms',
    keyframes([
      style({
        transform: 'scale(0.8) rotateY(-45deg)',
        offset: 0.5,
        backgroundColor: 'red',
      }),
      style({
        transform: 'rotateY(0deg)',
        offset: 1,
      }),
    ])
  ),
]);
