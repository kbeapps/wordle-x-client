import { animate, animation, style, keyframes } from '@angular/animations';

export const wonAnimation = animation(
  [
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
  ],
  { params: { color: '{{color}}', delay: '{{delay}}' } }
);
