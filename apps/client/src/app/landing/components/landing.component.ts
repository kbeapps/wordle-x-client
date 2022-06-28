import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  title: string = environment.appTitle;
  onHome: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.router.navigate([{ outlet: { landingOutlet: '/auth/login' } }]);
  }

  onRegister(): void {
    this.router.navigateByUrl('auth/signup');
  }
}
