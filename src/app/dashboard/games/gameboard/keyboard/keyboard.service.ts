import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class IKey {
  key: string = '';
  color: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  initializedKeys: IKey[] = [];
  private subject = new Subject();
  constructor() {
    this.subject.next(this.initializedKeys);
  }

  setKeyColor(keyMap: IKey[]): void {
    let index: number = -1;
    for (let key of keyMap) {
      index = this.initializedKeys.findIndex((item) => item.key === key.key);
      if (index !== -1) {
        this.initializedKeys[index] = { key: key.key, color: key.color };
      }
    }
    this.subject.next(this.initializedKeys);
  }

  setInitializedKeys(initializedKeys: IKey[]): void {
    this.initializedKeys = initializedKeys;
  }

  watchInitializedKeys(): Observable<any> {
    return this.subject.asObservable();
  }
}
