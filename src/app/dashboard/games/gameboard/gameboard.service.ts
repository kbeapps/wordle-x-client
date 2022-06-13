import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreService } from 'src/app/shared/utils/store.service';

export class GameState {
  guesses: { guess: string; output: string[] }[] = [];
}

const testGame: GameState = {
  guesses: [
    { guess: 'testn', output: [] },
    { guess: 'water', output: [] },
    { guess: 'drags', output: [] },
    { guess: '', output: [] },
    { guess: '', output: [] },
    { guess: '', output: [] },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class GameboardService {
  gameState: GameState = new GameState();
  private subject = new Subject<any>();

  constructor(private storeService: StoreService) {}

  initializeGameState(totalGuesses: number): void {
    let gameState = this.storeService.getData('gameState');
    if (!gameState) {
      this.gameState.guesses = new Array(totalGuesses).fill(null).map(() => {
        return { guess: '', output: [] };
      });
      this.storeService.setData('gameState', this.gameState);
    }
    this.gameState = gameState as GameState;
    this.subject.next(this.gameState);
  }

  updateGuess(guess: string, activeRow: number, output?: string[]) {
    if (this.gameState.guesses[activeRow].guess !== guess) {
      this.gameState.guesses[activeRow] = {
        guess: guess,
        output: output ? output : [],
      };
      this.storeService.setData('gameState', this.gameState);
      this.subject.next(this.gameState);
    }
  }

  watchGameState(): Observable<any> {
    return this.subject.asObservable();
  }
}
