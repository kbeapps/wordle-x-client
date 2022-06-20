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
  private BoardRowList!: QueryList<BoardRowComponent>;

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

  private evaluateGuess(guessArray: string[], inputAnswer: string): IKey[] {
    let keyMap: IKey[] = [];
    let guessOutput: string[] = [];
    let key: string = '';
    let evaluation: string = '';
    const answer: string[] = inputAnswer.split('');
    let answerLetterCount: number = 0;
    let letterCount: number = 0;
    let isDuplicate: boolean = false;

    for (const [index, char] of guessArray.entries()) {
      key = char.toLowerCase();
      answerLetterCount = answer.filter(
        (char) => char.toLowerCase() === key
      ).length;
      letterCount = guessArray.filter(
        (char) => char.toLowerCase() === key
      ).length;

      switch (true) {
        case key === answer[index]:
          evaluation = 'correct';
          break;

        case answer.includes(key) && letterCount <= answerLetterCount:
        case answer.includes(key) && letterCount > 1 && !isDuplicate:
          if (letterCount > 1 && answerLetterCount <= 1) {
            isDuplicate = true;
          }
          evaluation = 'close';
          break;
        default:
          evaluation = 'incorrect';
          break;
      }

      keyMap.push({ key: key, color: evaluation });
      guessOutput.push(evaluation);
    }

    this.gameboardService.updateGuessEvaluation(this.activeRow, guessOutput);
    return keyMap;
  }

  private handleGuess(guessArray: string[]): void {
    const guess: string = guessArray.join('').toLowerCase();
    let keyMap: IKey[] = [];

    const isValidWord: boolean = checkWord(guess);
    if (isValidWord) {
      keyMap = this.evaluateGuess(guessArray, this.answer);
    }

    const wonGame = guess === this.answer;

    this.BoardRowList.find(
      (item, index) => index === this.activeRow
    )?.startAnimation(wonGame, isValidWord);

    if (isValidWord && !wonGame) {
      this.activeRow += 1;
    }
    this.keyboardService.setKeyColor(keyMap);
  }

  ngOnDestroy() {
    this.gameStoreSubscription.unsubscribe();
  }
}
