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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.router.navigateByUrl('login');
  }

  onRegister(): void {
    this.router.navigateByUrl('signup');
  }
}
