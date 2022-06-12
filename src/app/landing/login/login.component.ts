import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() email: string = '';
  @Input() password: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.email) {
      alert('Please enter an email address');
      return;
    }

    if (!this.password) {
      alert('Please enter a password');
      return;
    }

    // Call service to attempt login

    this.email = '';
    this.password = '';
  }
}
