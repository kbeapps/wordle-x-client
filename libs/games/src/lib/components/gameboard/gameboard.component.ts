import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IKey, IGame } from '@client/data-models';
import { KeyboardService } from '../../services/keyboard.service';
import { checkWord } from 'check-if-word-partial';
import { BoardRowComponent } from '../board-row/board-row.component';
import { Store } from '@ngrx/store';
import { getGame } from '../../+state/game.selectors';
import { GameActions } from '../../+state/game.actions';

@Component({
  selector: 'client-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  public game: Observable<IGame> = this.store.select(getGame);
  private wordSize = 5;
  private totalGuesses = 6;
  private activeRow = 0;
  private gameStoreSubscription: Subscription = new Subscription();
  public loading = true;
  private answer = '';
  public animateRowNumber = -1;

  @ViewChildren(BoardRowComponent)
  private BoardRowList!: QueryList<BoardRowComponent>;

  constructor(private keyboardService: KeyboardService, private store: Store) {
    this.store.dispatch(
      GameActions.initializeGameboard({ totalGuesses: 6, wordSize: 5 })
    );
  }

  ngOnInit(): void {
    // this.answer = this.gameboardService.answer.toLowerCase();
    // this.gameboardService.initializeGameStore(this.totalGuesses, this.wordSize);
    this.initialize();
  }

  private initialize(): void {
    // this.activeRow = this.gameStore.guesses.filter(
    //   (item) => item.guess[0] !== ''
    // ).length;
    // this.loading = false;
  }

  public onKeyInput(key: string): void {
    // const currentGuess: string[] = this.gameStore.guesses[this.activeRow].guess;
    // let currentPosition: number = currentGuess.findIndex((char) => char === '');
    // if (currentPosition === -1) {
    //   currentPosition = this.wordSize;
    // }
    // const currentGuessLength: number = currentGuess.filter(
    //   (char) => char != ''
    // ).length;
    // switch (key) {
    //   case 'ENTER':
    //     if (currentGuessLength === this.wordSize) {
    //       this.handleGuess(currentGuess);
    //     }
    //     break;
    //   case 'BACKSPACE':
    //     if (currentGuessLength && currentPosition >= 0) {
    //       currentGuess[currentPosition - 1] = '';
    //       this.gameboardService.updateGuess(currentGuess, this.activeRow);
    //       currentPosition -= 1;
    //     }
    //     break;
    //   default:
    //     if (currentGuessLength < this.wordSize && currentPosition >= 0) {
    //       currentGuess[currentPosition] = key;
    //       currentPosition += 1;
    //       this.gameboardService.updateGuess(currentGuess, this.activeRow);
    //     }
    //     break;
    // }
  }

  private evaluateGuess(guessArray: string[], inputAnswer: string): IKey[] {
    const keyMap: IKey[] = [];
    const guessOutput: string[] = [];
    let key = '';
    let evaluation = '';
    const answer: string[] = inputAnswer.split('');
    let answerLetterCount = 0;
    let letterCount = 0;
    let isDuplicate = false;

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

    // this.gameboardService.updateGuessEvaluation(this.activeRow, guessOutput);
    return keyMap;
  }

  private handleGuess(guessArray: string[]): void {
    const guess: string = guessArray.join('').toLowerCase();
    let keyMap: IKey[] = [];

    const isValidWord: boolean = checkWord(guess);
    if (isValidWord) {
      keyMap = this.evaluateGuess(guessArray, this.answer);
      this.store.dispatch(GameActions.updateActiveWinstate({ winState: true }));
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
}
