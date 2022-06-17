import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  @Input() darkModeEnabled: boolean =
    this.profileService.getSelectedTheme() === 'dark';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {}

  toggleTheme(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.profileService.toggleTheme(this.darkModeEnabled);
  }
}
