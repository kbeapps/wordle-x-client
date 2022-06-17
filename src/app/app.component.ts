import { Component } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = environment.appTitle;
  appIsReady: boolean = false;
  appReadySubscription: Subscription = new Subscription();
  selectedTheme: string = this.profileService.getSelectedTheme();
  selectedThemeSubscription: Subscription = new Subscription();

  constructor(
    private loadService: LoadService,
    private profileService: ProfileService
  ) {
    this.loadService
      .watchAppIsReady()
      .subscribe((readyState) => (this.appIsReady = readyState));
    this.selectedThemeSubscription = this.profileService
      .watchSelectedTheme()
      .subscribe((theme: string) => (this.selectedTheme = theme));
  }
}
