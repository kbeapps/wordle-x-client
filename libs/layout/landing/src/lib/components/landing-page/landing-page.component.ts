import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_TITLE } from '../../app-title.token';

@Component({
  selector: 'client-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  public title: string;

  constructor(
    private router: Router,
    @Inject(APP_TITLE) private appTitle: string
  ) {
    this.title = appTitle;
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  onRegister(): void {
    this.router.navigateByUrl('auth/signup');
  }
}
