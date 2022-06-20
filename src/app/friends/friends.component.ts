import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FriendsService } from './friends.service';
import { UserService } from '../auth';
import { IUser } from '../core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public isLoading: boolean = false;
  public friendsList: string[] = [];
  public emailOrUsername!: FormControl;

  private userSubscription$: Subscription = new Subscription();

  constructor(
    private friendsService: FriendsService,
    private userService: UserService
  ) {
    this.userSubscription$ = this.userService
      .watchUser()
      .subscribe((user: IUser) => (this.friendsList = user.friends));
  }

  ngOnInit(): void {
    this.emailOrUsername = new FormControl('', Validators.required);
  }

  public onSendFriendRequest(): void {
    if (!this.emailOrUsername) {
      return;
    }
  }

  public onDeleteFriend(friend: string): void {
    console.log(
      `You blocked me on facebook, now youre going to die: ${friend}`
    );
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }
}
