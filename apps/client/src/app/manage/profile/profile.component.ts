import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public logOut(): void {
    this.authService.toggleIsLoggedIn(false);
  }
}
