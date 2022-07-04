import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IKey, IGuess } from '@client/data-models';
import { KeyboardService } from '../../services/keyboard.service';
import { checkWord } from 'check-if-word-partial';
import { BoardRowComponent } from '../board-row/board-row.component';
import { Store } from '@ngrx/store';
import {
  getActiveGuesses,
  getActiveRow,
  getCurrentGuesses,
  getGameLoading,
} from '../../+state/game.selectors';
import { GameActions } from '../../+state/game.actions';

@Component({
  selector: 'client-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  public guesses$: Observable<IGuess[]> = this.store.select(getActiveGuesses);
  public activeRow$: Observable<number> = this.store.select(getActiveRow);
  public loading$ = this.store.select(getGameLoading);

  private answer = 'testy';
  public animateRowNumber = -1;

  @ViewChildren(BoardRowComponent)
  private BoardRowList!: QueryList<BoardRowComponent>;

  constructor(private keyboardService: KeyboardService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      GameActions.initializeGameboard({ totalGuesses: 6, wordSize: 5 })
    );
  }

  public onKeyInput(key: string): void {
    let guessObj: { guesses: IGuess[]; activeIndex: number } = {
      guesses: [],
      activeIndex: 0,
    };

    const currentGuessesSubscription$ = this.store
      .select(getCurrentGuesses)
      .subscribe((guesses) => (guessObj = guesses));
    currentGuessesSubscription$.unsubscribe();

    let guesses = [...guessObj.guesses];
    const guessIndex = guessObj.activeIndex;
    const guess = [...guesses[guessIndex].guess];

    let currentPosition = guess.findIndex((char) => char === '');
    const wordSize = guess.length;
    if (currentPosition === -1) {
      currentPosition = wordSize;
    }
    const currentGuessLength: number = guess.filter(
      (char) => char != ''
    ).length;

    switch (key) {
      case 'enter':
        if (currentGuessLength === wordSize) {
          this.handleGuess(guess);
        }
        break;
      case 'backspace':
        if (currentGuessLength && currentPosition >= 0) {
          guess[currentPosition - 1] = '';
          guesses = guesses.map((oldGuess, index) =>
            index === guessIndex
              ? { guess: guess, evaluation: oldGuess.evaluation }
              : oldGuess
          );

          this.store.dispatch(
            GameActions.updateGuesses({
              guesses: guesses,
            })
          );
        }
        break;
      default:
        if (currentGuessLength < wordSize && currentPosition >= 0) {
          guess[currentPosition] = key;
          guesses = guesses.map((oldGuess, index) =>
            index === guessIndex
              ? { guess: guess, evaluation: oldGuess.evaluation }
              : oldGuess
          );

          this.store.dispatch(
            GameActions.updateGuesses({
              guesses: guesses,
            })
          );
        }
        break;
    }
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

    // this.BoardRowList.find(
    //   (item, index) => index === this.activeRow
    // )?.startAnimation(wonGame, isValidWord);

    // if (isValidWord && !wonGame) {
    //   this.activeRow += 1;
    // }
    this.keyboardService.setKeyColor(keyMap);
  }
}
