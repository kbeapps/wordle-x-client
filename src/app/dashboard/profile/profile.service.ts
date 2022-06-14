import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  selectedTheme: string = 'dark';
  private subject = new Subject<any>();
  constructor() {
    this.subject.next(this.selectedTheme);
  }

  toggleTheme(darkModeEnabled: boolean): void {
    this.selectedTheme = darkModeEnabled ? 'dark' : 'light';
    this.subject.next(this.selectedTheme);
  }

  getSelectedTheme(): string {
    return this.selectedTheme;
  }

  watchSelectedTheme(): Observable<any> {
    return this.subject.asObservable();
  }
}
