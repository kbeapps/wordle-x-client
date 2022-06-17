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
    const nameIndex = this.loadingStates.findIndex(
      (loadName) => loadName === name
    );
    if (nameIndex > -1) {
      this.loadingStates.splice(nameIndex, 1);
    }
    this.subject.next(this.appIsReady);
  }

  public watchAppIsReady(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
