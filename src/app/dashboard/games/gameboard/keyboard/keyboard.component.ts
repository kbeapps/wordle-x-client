import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  topRowKeys: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  middleRowKeys: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  bottomRowKeys: string[] = [
    'enter',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    'delete',
  ];

  constructor() {}

  ngOnInit(): void {}
}
