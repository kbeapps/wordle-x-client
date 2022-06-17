import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {}

  async onCreateGame() {
    const game = {
      name: 'new test game',
      ownerId: '62a608842d4492d0c7eacfec',
      players: ['62a608842d4492d0c7eacfec'],
      wordHistory: ['test'],
      type: 'custom',
      winCondition: 'score',
      wordSize: 4,
    };

    // Add request
  }

  async onGetGame() {
    // Add request
  }

  async onUpdateGame() {
    // Add request
  }

  async onDeleteGame() {
    // Add request
  }
}
