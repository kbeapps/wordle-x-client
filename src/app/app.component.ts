import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Wordle X';
  isLoggedIn: boolean = false; // add loggedIn observable from auth service
  selectedTheme: string = 'dark'; // add theme observable from preferences service

  constructor() {}
}
