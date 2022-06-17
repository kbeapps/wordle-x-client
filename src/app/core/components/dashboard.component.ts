import { Component, OnInit } from '@angular/core';
import { LoadService } from '../load.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  appIsReady: boolean = false;
  appReadySubscription: Subscription = new Subscription();

  constructor(private loadService: LoadService) {
    this.loadService
      .watchAppIsReady()
      .subscribe((readyState) => (this.appIsReady = readyState));
  }

  ngOnInit(): void {}
}
