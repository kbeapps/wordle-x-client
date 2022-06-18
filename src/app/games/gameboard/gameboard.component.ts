import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IKey } from './keyboard/keyboard.service';
import { GameboardService, GameStore } from './gameboard.service';
import { KeyboardService } from './keyboard/keyboard.service';
import { checkWord } from 'check-if-word-partial';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  gameStore: GameStore = new GameStore();
  wordSize: number = 5;
  totalGuesses: number = 6;
  initializedWordSize: string[] = [];
  activeRow: number = 0;
  gameStoreSubscription: Subscription = new Subscription();
  loading: boolean = true;
  answer: string = '';

  constructor(
    private gameboardService: GameboardService,
    private keyboardService: KeyboardService
  ) {
    this.gameStoreSubscription = this.gameboardService
      .watchGameStore()
      .subscribe((gameStore: GameStore) => (this.gameStore = gameStore));
  }

  ngOnInit(): void {
    this.answer = this.gameboardService.answer.toLowerCase();
    this.gameboardService.initializeGameStore(this.totalGuesses, this.wordSize);
    this.initialize();
  }

  initialize(): void {
    this.initializedWordSize = Array(this.wordSize).fill('');
    this.activeRow = this.gameStore.guesses.filter(
      (item) => item.guess[0] !== ''
    ).length;
    this.loading = false;
  }

  onKeyInput(key: string): void {
    let currentGuess: string[] = this.gameStore.guesses[this.activeRow].guess;
    let currentPosition: number = currentGuess.findIndex((char) => char === '');

    if (currentPosition === -1) {
      currentPosition = this.wordSize;
    }

    const currentGuessLength: number = currentGuess.filter(
      (char) => char != ''
    ).length;
    console.log(key, this.activeRow);
    switch (key) {
      case 'ENTER':
        console.log(currentGuessLength, this.wordSize);
        if (currentGuessLength === this.wordSize) {
          this.handleGuess(currentGuess);
        }
        break;
      case 'BACKSPACE':
        console.log(currentGuessLength, currentPosition);
        if (currentGuessLength && currentPosition >= 0) {
          currentGuess[currentPosition - 1] = '';
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
          currentPosition -= 1;
        }
        break;

      default:
        console.log(currentGuessLength, currentPosition);
        if (currentGuessLength < this.wordSize && currentPosition >= 0) {
          currentGuess[currentPosition] = key;
          currentPosition += 1;
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
        }
        break;
    }
  }

  colorOnGuess(guess: string[], answer: string): void {
    let keyMap: IKey[] = [];
    let guessOutput: string[] = [];
    let key: string = '';
    let evaluation: string = '';

    for (let i in guess) {
      key = guess[i];
      evaluation =
        key === answer[i]
          ? 'correct'
          : answer.includes(key)
          ? 'close'
          : 'incorrect';

      keyMap.push({ key: key, color: evaluation });
      guessOutput.push(evaluation);
    }
    this.keyboardService.setKeyColor(keyMap);
    this.gameboardService.updateGuess(guess, this.activeRow, guessOutput);
  }

  onWin(): void {
    console.log('game won!');
  }

  handleGuess(guessArray: string[]): void {
    const guess: string = guessArray.join('').toLowerCase();
    console.log(guess);
    if (guess === this.answer) {
      this.onWin();
      return;
    }

    const isValidWord: boolean = checkWord(guess);
    if (!isValidWord) {
      // handle invalid word
      console.log('word is invalid');
      return;
    }
    console.log('is this happening?');
    // handle valid word guess
    this.colorOnGuess(guessArray, this.answer);
    this.activeRow += 1;
  }

  getKeyColor(key: string) {
    return this.keyboardService.getKeyColor(key);
  }
}
