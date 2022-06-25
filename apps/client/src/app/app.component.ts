import { Component } from '@angular/core';
import { ProfileService } from './manage/profile/profile.service';
import { environment } from '../environments/environment';
import { LoadService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = environment.appTitle;

  public appState$ = this.loadService.watchAppIsReady();
  public selectedTheme$ = this.profileService.watchSelectedTheme();

  constructor(
    private loadService: LoadService,
    private profileService: ProfileService
  ) {}
}
