import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { getGame } from '../+state/game.selectors';

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  public game$ = this.store.select(getGame);
  private finalAnswer = 'testy'; // TODO: add answer population

  constructor(private store: Store) {}

  public initializeGameStore(totalGuesses: number, wordSize: number): void {
    // let gameStore = this.storeService.getData('gameStore') as GameStore;
    // if (!gameStore) {
    //   gameStore = new GameStore();
    //   const outputArray = new Array(wordSize).fill(null).map(() => {
    //     return '';
    //   });
    //   gameStore.guesses = new Array(totalGuesses).fill(null).map(() => {
    //     return { guess: new Array(wordSize).fill(''), output: outputArray };
    //   });
    //   this.storeService.setData('gameStore', gameStore);
    // }
    // this.gameStore = gameStore as GameStore;
    // this.gameStoreSubject$.next(this.gameStore);
  }

  public setWinState(gameIsWon: boolean) {
    // this.gameStore.winState = gameIsWon;
    // // this.storeService.setData('gameStore', this.gameStore);
    // this.gameStoreSubject$.next(this.gameStore);
  }

  public updateGuess(guessArray: string[], activeRow: number): void {
    // this.gameStore.guesses[activeRow].guess = guessArray;
    // this.updateStore();
  }

  public updateGuessEvaluation(activeRow: number, output: string[]): void {
    // this.gameStore.guesses[activeRow].output = output;
    // this.updateStore();
  }

  private updateStore(): void {
    // this.storeService.setData('gameStore', this.gameStore);
    // this.gameStoreSubject$.next(this.gameStore);
  }

  // public watchGameStore(): Observable<GameStore> {
  //   return this.gameStoreSubject$.asObservable();
  // }
}
