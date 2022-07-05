import { Component, Inject } from '@angular/core';
import { APP_TITLE } from '../../app-title.token';
import { Router } from '@angular/router';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public title: string = this.appTitle;

  constructor(
    @Inject(APP_TITLE) private appTitle: string,
    private router: Router
  ) {}

  public onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  public onHome(): void {
    this.router.navigateByUrl('/');
  }
}
