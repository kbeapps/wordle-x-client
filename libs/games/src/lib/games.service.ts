import { Injectable } from '@angular/core';
import { getData, setData } from '@client/shared/local-store';
import { winStateKey, guessesKey, rowKey } from './+state';
import { IGameStore, IGuess } from '@client/data-models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  public initializeGameboard(
    totalGuesses: number,
    wordSize: number
  ): Observable<IGameStore> {
    const activeWinState = getData(winStateKey);
    const activeGuesses = getData(guessesKey);
    const activeRow = getData(rowKey);

    const gameStore: IGameStore = {
      guesses: activeGuesses
        ? (activeGuesses as IGuess[])
        : this.generateGuesses(totalGuesses, wordSize),
      row: activeRow ? Number(activeRow) : 0,
      winState: activeWinState ? Boolean(activeWinState) : false,
    };

    setData(winStateKey, String(gameStore.winState));
    setData(guessesKey, gameStore.guesses);
    setData(rowKey, String(gameStore.row));
    console.log('returning');
    return of(gameStore);
  }

  private generateGuesses = (totalGuesses: number, wordSize: number) => {
    const outputArray = new Array(wordSize).fill(null).map(() => '');

    return new Array(totalGuesses).fill(null).map(() => ({
      guess: new Array(wordSize).fill(''),
      evaluation: outputArray,
    }));
  };
}
