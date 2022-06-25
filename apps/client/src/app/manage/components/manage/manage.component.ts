import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  public links: string[] = ['friends', 'groups', 'profile'];
  public activeLink = this.links[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const splitUrl: string[] = this.router.url.split('/');
    const urlLink: string = splitUrl.slice(-1)[0];
    if (!this.links.includes(urlLink)) {
      this.router.navigateByUrl(this.router.url + '/friends');
      return;
    }
    this.activeLink = urlLink;
  }
}
