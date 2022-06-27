// import { Injectable } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { fetch } from '@nrwl/angular';

// import * as GameActions from './game.actions';
// import * as GameFeature from './game.reducer';

// @Injectable()
// export class GameEffects {
//   init$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(GameActions.init),
//       fetch({
//         run: (action) => {
//           // Your custom service 'load' logic goes here. For now just return a success action...
//           return GameActions.loadGameSuccess({ game: [] });
//         },
//         onError: (action, error) => {
//           console.error('Error', error);
//           return GameActions.loadGameFailure({ error });
//         },
//       })
//     )
//   );

//   constructor(private readonly actions$: Actions) {}
// }
