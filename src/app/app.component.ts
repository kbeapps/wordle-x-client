import { Component } from '@angular/core';
import { ProfileService } from './dashboard/profile/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Wordle X';
  selectedTheme: string = this.profileService.getSelectedTheme();
  selectedThemeSubscription: Subscription = new Subscription();

  constructor(private profileService: ProfileService) {
    this.selectedThemeSubscription = this.profileService
      .watchSelectedTheme()
      .subscribe((theme) => (this.selectedTheme = theme));
  }
}
