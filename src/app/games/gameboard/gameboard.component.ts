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
  gameState: GameStore = new GameStore();
  wordSize: number = 5;
  totalGuesses: number = 6;
  initializedWordSize: string[] = [];
  activeRow: number = 0;
  gameStateSubscription: Subscription = new Subscription();
  loading: boolean = true;
  answer: string = '';

  constructor(
    private gameboardService: GameboardService,
    private keyboardService: KeyboardService
  ) {
    this.gameStateSubscription = this.gameboardService
      .watchGameState()
      .subscribe((gameState: GameStore) => (this.gameState = gameState));
  }

  ngOnInit(): void {
    this.answer = this.gameboardService.answer.toLowerCase();
    this.gameboardService.initializeGameState(this.totalGuesses, this.wordSize);
    this.initialize();
  }

  initialize(): void {
    this.initializedWordSize = Array(this.wordSize).fill('');
    this.activeRow = this.gameState.guesses.filter(
      (elem) => elem.guess.length === this.wordSize
    ).length;
    this.loading = false;
  }

  onKeyInput(key: string): void {
    let currentGuess: string = this.gameState.guesses[this.activeRow].guess;
    const currentGuessLength: number = currentGuess.length;

    switch (key) {
      case 'ENTER':
        if (currentGuessLength === this.wordSize) {
          this.handleGuess(currentGuess);
        }
        break;
      case 'BACKSPACE':
        if (currentGuessLength) {
          currentGuess = currentGuess.slice(0, -1);
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
        }
        break;

      default:
        if (currentGuessLength < this.wordSize) {
          currentGuess += key;
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
        }
        break;
    }
  }

  colorOnGuess(guess: string, answer: string): void {
    const separatedGuess = guess.split('');
    let keyMap: IKey[] = [];
    let guessOutput: string[] = [];
    let key: string = '';
    let evaluation: string = '';

    for (let i in separatedGuess) {
      key = separatedGuess[i];
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

  handleGuess(guess: string): void {
    console.log('handling guess');
    guess = guess.toLowerCase();
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

    // handle valid word guess
    this.colorOnGuess(guess, this.answer);
    this.activeRow += 1;
  }

  getKeyColor(key: string) {
    return this.keyboardService.getKeyColor(key);
  }
}
