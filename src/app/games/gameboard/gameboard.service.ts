import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreService } from 'src/app/shared-services';

export class GameStore {
  guesses: { guess: string; output: string[] }[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  gameStore!: GameStore;
  answer: string = 'testy'; // TODO: add answer population

  private gameStateSubject = new Subject<any>();

  constructor(private storeService: StoreService) {}

  public get store(): GameStore {
    return this.gameStore;
  }

  initializeGameState(totalGuesses: number, wordSize: number): void {
    let gameState = this.storeService.getData('gameState') as GameStore;
    if (!gameState) {
      gameState = new GameStore();
      const outputArray = new Array(wordSize).fill(null).map(() => {
        return '';
      });
      gameState.guesses = new Array(totalGuesses).fill(null).map(() => {
        return { guess: '', output: outputArray };
      });

      this.storeService.setData('gameStore', gameState);
    }
    this.gameStore = gameState as GameStore;
    this.gameStateSubject.next(this.gameStore);
  }

  updateGuess(guess: string, activeRow: number, output?: string[]) {
    this.gameStore.guesses[activeRow] = {
      guess: guess,
      output: output ? output : [],
    };
    this.storeService.setData('gameState', this.gameStore);
    this.gameStateSubject.next(this.gameStore);
  }

  watchGameState(): Observable<any> {
    return this.gameStateSubject.asObservable();
  }
}
