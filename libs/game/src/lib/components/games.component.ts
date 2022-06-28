import { Component } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'client-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  constructor(private gamesService: GamesService) {}

  async onCreateGame() {
    // const game = {
    //   name: 'new test game',
    //   ownerId: '62a608842d4492d0c7eacfec',
    //   players: ['62a608842d4492d0c7eacfec'],
    //   wordHistory: ['test'],
    //   type: 'custom',
    //   winCondition: 'score',
    //   wordSize: 4,
    // };
    // Add request
  }
}
