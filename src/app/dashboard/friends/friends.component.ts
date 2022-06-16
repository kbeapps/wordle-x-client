import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FriendsService } from './friends.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  isLoading: boolean = false;
  // friendsList: string[] = [];
  emailOrUsername!: FormControl;

  friendsList: string[] = [
    'friend',
    'friend',
    'friend',
    'friend',
    'friend',
    'friend',
    'friend',
    'friend',
  ];

  constructor(
    private friendsService: FriendsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.emailOrUsername = new FormControl('', Validators.required);
    // this.friendsList = this.authService.authStore;
  }

  async onSendFriendRequest(): Promise<void> {
    if (!this.emailOrUsername) {
      return;
    }

    await firstValueFrom(
      this.friendsService.sendFriendRequest(this.emailOrUsername.value)
    )
      .then((res) => console.log('res: ', res))
      .catch((err) => console.log('err: ', err))
      .finally(() => console.log('complete'));
  }

  async onDeleteFriend(friend: string): Promise<void> {
    console.log(
      `You blocked me on facebook, now youre going to die: ${friend}`
    );
  }
}
