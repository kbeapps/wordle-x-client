import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  topRowKeys: string[] = ['A', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  middleRowKeys: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  bottomRowKeys: string[] = [
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DELETE',
  ];

  constructor() {}

  ngOnInit(): void {}

  onClick(key: string) {
    console.log('event: ', key);
  }
}
