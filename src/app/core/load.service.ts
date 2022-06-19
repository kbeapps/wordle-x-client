import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface AppState {
  isReady: boolean;
  hasError: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private state: AppState = {
    isReady: false,
    hasError: false,
  };
  private loadingStates: string[] = [];
  private appStateSubject = new Subject<AppState>();
  constructor() {}

  public get appState(): AppState {
    return this.state;
  }

  public set appIsReady(isReady: boolean) {
    this.state.isReady = isReady;
    this.appStateSubject.next(this.state);
  }

  public set appHasError(hasError: boolean) {
    this.state.hasError = hasError;
    this.appStateSubject.next(this.state);
  }

  public startLoad(name: string): void {
    if (!this.loadingStates.includes(name)) {
      this.loadingStates.push(name);
    }
  }

  public finishLoad(name: string): void {
    const nameIndex = this.loadingStates.findIndex(
      (loadName) => loadName === name
    );
    if (nameIndex > -1) {
      this.loadingStates.splice(nameIndex, 1);
    }
    this.appIsReady = !this.loadingStates.length;
  }

  public watchAppIsReady(): Observable<AppState> {
    return this.appStateSubject.asObservable();
  }
}
