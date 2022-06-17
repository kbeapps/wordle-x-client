import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private loadingStates: string[] = [];
  private subject = new Subject<boolean>();
  constructor() {}

  public get appIsReady(): boolean {
    return !this.loadingStates.length;
  }

  public startLoad(name: string): void {
    if (!this.loadingStates.includes(name)) {
      this.loadingStates.push(name);
    }
  }

  public finishLoad(name: string): void {
    this.loadingStates = this.loadingStates.filter(
      (loadedName) => loadedName === name
    );
    this.subject.next(this.appIsReady);
  }

  public watchAppIsReady(): Observable<boolean> {
    return this.subject.asObservable();
  }

  // TODO:
  // add start & finish loads to applicable components
  // add subscription for appIsReady to app.component
  // create loading screen based on state
  //
}
