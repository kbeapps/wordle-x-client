import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreService } from 'src/app/shared/utils/store.service';

export class GameState {
  guesses: { guess: string; output: string[] }[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  gameState!: GameState;
  private subject = new Subject<any>();

  constructor(private storeService: StoreService) {}

  initializeGameState(totalGuesses: number, wordSize: number): void {
    let gameState = this.storeService.getData('gameState') as GameState;
    if (!gameState) {
      gameState = new GameState();
      const outputArray = new Array(wordSize).fill(null).map(() => {
        return '';
      });
      gameState.guesses = new Array(totalGuesses).fill(null).map(() => {
        return { guess: '', output: outputArray };
      });

      this.storeService.setData('gameState', gameState);
    }
    this.gameState = gameState as GameState;
    this.subject.next(this.gameState);
  }

  updateGuess(guess: string, activeRow: number, output?: string[]) {
    this.gameState.guesses[activeRow] = {
      guess: guess,
      output: output ? output : [],
    };
    this.storeService.setData('gameState', this.gameState);
    this.subject.next(this.gameState);
  }

  watchGameState(): Observable<any> {
    return this.subject.asObservable();
  }
}