import { Component } from '@angular/core';
import { ProfileService } from './profile/profile.service';
import { environment } from 'src/environments/environment';
import { LoadService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = environment.appTitle;

  appState$ = this.loadService.watchAppIsReady();
  selectedTheme$ = this.profileService.watchSelectedTheme();

  constructor(
    private loadService: LoadService,
    private profileService: ProfileService
  ) {}
}
