import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreService } from 'src/app/shared-services';

export class GameStore {
  guesses: { guess: string[]; output: string[] }[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  gameStore!: GameStore;
  answer: string = 'testy'; // TODO: add answer population

  private gameStoreSubject = new Subject<any>();

  constructor(private storeService: StoreService) {}

  public get store(): GameStore {
    return this.gameStore;
  }

  initializeGameStore(totalGuesses: number, wordSize: number): void {
    let gameStore = this.storeService.getData('gameStore') as GameStore;
    if (!gameStore) {
      gameStore = new GameStore();
      const outputArray = new Array(wordSize).fill(null).map(() => {
        return '';
      });
      gameStore.guesses = new Array(totalGuesses).fill(null).map(() => {
        return { guess: new Array(wordSize).fill(''), output: outputArray };
      });

      this.storeService.setData('gameStore', gameStore);
    }
    this.gameStore = gameStore as GameStore;
    this.gameStoreSubject.next(this.gameStore);
  }

  updateGuess(guess: string[], activeRow: number, output?: string[]) {
    this.gameStore.guesses[activeRow] = {
      guess: guess,
      output: output ? output : [],
    };

    this.storeService.setData('gameStore', this.gameStore);
    this.gameStoreSubject.next(this.gameStore);
  }

  watchGameStore(): Observable<any> {
    return this.gameStoreSubject.asObservable();
  }
}
