import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IKey } from './keyboard/keyboard.service';
import { GameboardService, GameState } from './gameboard.service';
import { KeyboardService } from './keyboard/keyboard.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  gameState: GameState = new GameState();
  wordSize: number = 5;
  totalGuesses: number = 6;
  initializedWordSize: string[] = [];
  activeRow: number = 0;
  gameStateSubscription: Subscription = new Subscription();

  constructor(
    private gameboardService: GameboardService,
    private keyboardService: KeyboardService
  ) {
    this.gameStateSubscription = this.gameboardService
      .watchGameState()
      .subscribe((gameState: GameState) => {
        this.gameState = gameState;
        console.log('gs pushed: ', gameState);
      });
  }

  ngOnInit(): void {
    this.gameboardService.initializeGameState(this.totalGuesses);
    this.initializedWordSize = Array(this.wordSize).fill('');
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
      case 'DELETE':
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

  handleGuess(guess: string): void {
    const correctClass: string = 'correct-key';
    const incorrectClass: string = 'incorrect-key';
    const closeClass: string = 'close-key';

    const answer = 'TESTY';
    const separatedGuess = guess.split('');

    let keyMap: IKey[] = [];
    let guessOutput: string[] = [];
    let key: string = '';
    let colorClass: string = '';

    for (let i in separatedGuess) {
      key = separatedGuess[i];
      colorClass =
        key === answer[i]
          ? correctClass
          : answer.includes(key)
          ? closeClass
          : incorrectClass;

      keyMap.push({ key: key, color: colorClass });
      guessOutput.push(colorClass);
    }
    this.keyboardService.setKeyColor(keyMap);
    this.gameboardService.updateGuess(guess, this.activeRow);
  }

  getKeyColor(key: string) {
    console.log('getting', key);
    return this.keyboardService.getKeyColor(key);
  }
}
