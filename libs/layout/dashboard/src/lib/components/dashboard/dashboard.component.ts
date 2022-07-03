import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions, getUser } from '@client/auth/src';
import { Store } from '@ngrx/store';

@Component({
  selector: 'client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public links: string[] = ['play', 'manage'];
  public activeLink = this.links[0];

  constructor(private router: Router, private store: Store) {
    this.store.select(getUser).subscribe((user) => {
      if (!user._id) {
        this.store.dispatch(AuthActions.getUser());
      }
      return user;
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('manage')) {
      this.activeLink = this.links[1];
    }
  }
}
