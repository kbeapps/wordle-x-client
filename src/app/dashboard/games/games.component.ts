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

    await firstValueFrom(this.gamesService.create(game))
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err))
      .finally(() => console.log('complete'));
  }

  async onGetGame() {
    await firstValueFrom(this.gamesService.getAll('62a608842d4492d0c7eacfec'))
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err))
      .finally(() => console.log('complete'));
  }

  async onUpdateGame() {
    await firstValueFrom(
      this.gamesService.update('62a62f60366ec8afa877952c', {
        name: 'updated name',
      })
    )
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err))
      .finally(() => console.log('complete'));
  }

  async onDeleteGame() {
    await firstValueFrom(this.gamesService.delete('62a63066366ec8afa8779535'))
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err))
      .finally(() => console.log('complete'));
  }
}
