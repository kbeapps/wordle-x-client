import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private selectedThemeSubject$ = new BehaviorSubject<string>('dark');

  toggleTheme(darkModeEnabled: boolean): void {
    const theme = darkModeEnabled ? 'dark' : 'light';
    this.selectedThemeSubject$.next(theme);
  }

  get selectedTheme(): string {
    return this.selectedThemeSubject$.value;
  }

  watchSelectedTheme(): Observable<string> {
    return this.selectedThemeSubject$.asObservable();
  }
}
