import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  public create(game: IGame): Observable<boolean> {
    return this.http.post('game/create', game).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          // implement
          return true;
        }
        return false;
      })
    );
  }

  public get(gameId: string): Observable<boolean> {
    return this.http.get('game/get', '_id', gameId).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          // implement
          return true;
        }
        return false;
      })
    );
  }

  public getAll(ownerId: string): Observable<boolean> {
    return this.http.get('game/getAll', 'ownerId', ownerId).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          // implement
          return true;
        }
        return false;
      })
    );
  }

  public update(gameId: string, query: object): Observable<boolean> {
    return this.http
      .patch('game/update', {
        _id: gameId,
        ...query,
      })
      .pipe(
        catchError((error) => {
          throw new Error(error.message);
        }),
        map((res) => {
          if (res) {
            // implement
            return true;
          }
          return false;
        })
      );
  }

  public delete(gameId: string): Observable<boolean> {
    return this.http.delete('game/remove', gameId).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
      map((res) => {
        if (res) {
          // implement
          return true;
        }
        return false;
      })
    );
  }
}
