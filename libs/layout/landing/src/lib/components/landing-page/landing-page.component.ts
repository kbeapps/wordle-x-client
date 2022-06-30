import { Component, Inject } from '@angular/core';
import { APP_TITLE } from '../../app-title.token';
import { Router } from '@angular/router';

@Component({
  selector: 'client-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  public title: string;

  constructor(
    @Inject(APP_TITLE) private appTitle: string,
    private router: Router
  ) {
    this.title = appTitle;
  }

  onSignup(): void {
    this.router.navigateByUrl('auth/signup');
  }
}
