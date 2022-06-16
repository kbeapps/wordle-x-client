import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/utils/http-request.service';

interface IGame {
  _id?: string;
  name: string;
  ownerId: string;
  players: string[];
  wordHistory: string[];
  type: string;
  winCondition: string;
  wordSize: number;
  theme?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpRequestService) {}

  create(game: IGame) {
    // const game: IGame = {
    //   name: name,
    //   ownerId: ownerId,
    //   players: players,
    //   wordHistory: wordHistory,
    //   type: type,
    //   winCondition: winCondition,
    //   wordSize: wordSize,
    // };

    return this.http.post('game/create', game);
  }

  get(gameId: string) {
    return this.http.get('game/get', '_id', gameId);
  }

  getAll(ownerId: string) {
    return this.http.get('game/getAll', 'ownerId', ownerId);
  }

  update(gameId: string, query: object) {
    return this.http.patch('game/update', { _id: gameId, ...query });
  }

  delete(gameId: string) {
    return this.http.delete('game/remove', gameId);
  }
}
