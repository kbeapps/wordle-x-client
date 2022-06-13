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
  gameState: GameState = new GameState();
  private subject = new Subject<any>();

  constructor(private storeService: StoreService) {
    this.subject.next(this.gameState);
  }

  initializeGameState(totalGuesses: number): void {
    this.gameState.guesses = new Array(totalGuesses).fill(null).map(() => {
      return { guess: '', output: [] };
    });
    this.subject.next(this.gameState);
  }

  updateGuess(guess: string, activeRow: number) {
    if (this.gameState.guesses[activeRow].guess !== guess) {
      this.gameState.guesses[activeRow].guess = guess;
      this.subject.next(this.gameState);
    }
  }

  watchGameState(): Observable<GameState> {
    return this.subject.asObservable();
  }
}
