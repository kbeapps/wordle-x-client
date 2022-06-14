import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  isLoading: boolean = false;
  
  friendsList: string[] = [
    'friend1',
    'friend2',
    'friend2',
    'friend2',
    'friend2',
    'friend2',
    'friend2',
  ];
  addFriendForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.addFriendForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
    });
  }

  onAddFriend() {}

  onDeleteFriend() {}
}
