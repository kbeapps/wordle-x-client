import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { IKey } from './keyboard/keyboard.service';
import { GameboardService, GameStore } from './gameboard.service';
import { KeyboardService } from './keyboard/keyboard.service';
import { checkWord } from 'check-if-word-partial';
import { BoardRowComponent } from './board-row/board-row.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  public gameStore: GameStore = new GameStore();
  private wordSize: number = 5;
  private totalGuesses: number = 6;
  private activeRow: number = 0;
  private gameStoreSubscription: Subscription = new Subscription();
  public loading: boolean = true;
  private answer: string = '';
  public animateRowNumber: number = -1;
  @ViewChildren(BoardRowComponent)
  BoardRowList!: QueryList<BoardRowComponent>;

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

  private initialize(): void {
    this.activeRow = this.gameStore.guesses.filter(
      (item) => item.guess[0] !== ''
    ).length;
    this.loading = false;
    setInterval(() => {}, 500);
  }

  public onKeyInput(key: string): void {
    let currentGuess: string[] = this.gameStore.guesses[this.activeRow].guess;
    let currentPosition: number = currentGuess.findIndex((char) => char === '');

    if (currentPosition === -1) {
      currentPosition = this.wordSize;
    }

    const currentGuessLength: number = currentGuess.filter(
      (char) => char != ''
    ).length;
    switch (key) {
      case 'ENTER':
        if (currentGuessLength === this.wordSize) {
          this.handleGuess(currentGuess);
        }
        break;
      case 'BACKSPACE':
        if (currentGuessLength && currentPosition >= 0) {
          currentGuess[currentPosition - 1] = '';
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
          currentPosition -= 1;
        }
        break;

      default:
        if (currentGuessLength < this.wordSize && currentPosition >= 0) {
          currentGuess[currentPosition] = key;
          currentPosition += 1;
          this.gameboardService.updateGuess(currentGuess, this.activeRow);
        }
        break;
    }
  }

  private colorOnGuess(guessArray: string[], inputAnswer: string): void {
    let keyMap: IKey[] = [];
    let guessOutput: string[] = [];
    let key: string = '';
    let evaluation: string = '';
    const answer: string[] = inputAnswer.split('');

    for (const [index, char] of guessArray.entries()) {
      key = guessArray[index].toLowerCase();
      evaluation =
        key === answer[index]
          ? 'correct'
          : answer.includes(key)
          ? 'close'
          : 'incorrect';

      keyMap.push({ key: key, color: evaluation });
      guessOutput.push(evaluation);
    }

    this.gameboardService.updateGuessEvaluation(this.activeRow, guessOutput);
    this.keyboardService.setKeyColor(keyMap);
    this.BoardRowList.find(
      (item, index) => index === this.activeRow
    )?.startRowAnimation();
  }

  onWin(): void {
    console.log('game won!');
  }

  private handleGuess(guessArray: string[]): void {
    const guess: string = guessArray.join('').toLowerCase();
    if (guess === this.answer) {
      this.onWin();
      return;
    }

    const isValidWord: boolean = checkWord(guess);
    if (!isValidWord) {
      // handle invalid word
      return;
    }
    // handle valid word guess
    this.colorOnGuess(guessArray, this.answer);
    this.activeRow += 1;
  }

  getKeyColor(key: string) {
    return this.keyboardService.getKeyColor(key);
  }
}
