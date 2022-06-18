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
      index = this.initializedKeys.findIndex(
        (item) => item.key.toLowerCase() === key.key.toLowerCase()
      );
      if (index !== -1) {
        this.initializedKeys[index] = {
          key: key.key.toUpperCase(),
          color: key.color,
        };
      }
    }
    this.subject.next(this.initializedKeys);
  }

  setInitializedKeys(initializedKeys: IKey[]): void {
    this.initializedKeys = initializedKeys;
  }

  getKeyColor(key: string): string {
    const keyIndex: number = this.initializedKeys.findIndex(
      (item) => item.key === key
    );

    const item = this.initializedKeys[keyIndex];

    return keyIndex >= 0 ? item.color + '-key' : '';
  }

  watchInitializedKeys(): Observable<any> {
    return this.subject.asObservable();
  }
}
