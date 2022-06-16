import { Injectable } from '@angular/core';
import {
  HttpRequestService,
  IResponse,
} from 'src/app/shared/utils/http-request.service';

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

  async create(game: IGame): Promise<void | undefined> {
    // const game: IGame = {
    //   name: name,
    //   ownerId: ownerId,
    //   players: players,
    //   wordHistory: wordHistory,
    //   type: type,
    //   winCondition: winCondition,
    //   wordSize: wordSize,
    // };

    try {
      const res: IResponse | void = await this.http.post('game/create', game);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }

  async get(gameId: string): Promise<void | undefined> {
    try {
      const res: IResponse | void = await this.http.get(
        'game/get',
        '_id',
        gameId
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }

  async getAll(ownerId: string): Promise<void | undefined> {
    try {
      const res: IResponse | void = await this.http.get(
        'game/getAll',
        'ownerId',
        ownerId
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }

  async update(gameId: string, query: object): Promise<void | undefined> {
    try {
      const res: IResponse | void = await this.http.patch('game/update', {
        _id: gameId,
        ...query,
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }

  async delete(gameId: string): Promise<void | undefined> {
    try {
      const res: IResponse | void = await this.http.delete(
        'game/remove',
        gameId
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : undefined);
    }
  }
}
