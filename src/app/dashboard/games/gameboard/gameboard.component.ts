import { Component, OnInit } from '@angular/core';

interface gameState {
  guesses: {
    guess: string;
    output: string[];
  }[];
}

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnInit {
  gameState: gameState = {
    guesses: [],
  };
  wordSize: number = 5;
  totalGuesses: number = 6;
  initializedWordSize: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard() {
    const guess = { guess: '', output: [] };
    this.gameState.guesses = Array(this.totalGuesses).fill(guess);
    this.initializedWordSize = Array(this.wordSize).fill('');

    console.log(
      'gameState: ',
      this.gameState,
      ' /n initialized: ',
      this.initializedWordSize
    );
  }
}
