import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public links: string[] = ['play', 'manage'];
  public activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('manage')) {
      this.activeLink = this.links[1];
    }
  }
}
