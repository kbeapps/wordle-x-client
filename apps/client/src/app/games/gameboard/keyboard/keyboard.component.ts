import { Component, HostListener, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { KeyboardService, IKey } from './keyboard.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  keyCodeMin: number = 100;
  keyCodeMax: number = 0;
  topRowKeys: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
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
    'BACKSPACE',
  ];
  public $keyState = this.keyboardService.watchInitializedKeys();
  @Output() keyPressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private keyboardService: KeyboardService,
    @Inject(DOCUMENT) document: Document
  ) {}

  ngOnInit(): void {
    this.initializeKeys();
  }

  @HostListener('window:keydown', ['$event']) externalKeyboardEvent(
    event: any
  ) {
    if (document.getElementById('display-keyboard')) {
      // alphabet event keycodes: 65 - 90
      const keyCode: number = event.keyCode;
      // alphabet event keycodes: 65 - 90
      const eventKey: string = event.key.toUpperCase();
      if (
        (keyCode > 64 && keyCode < 91) ||
        eventKey === 'ENTER' ||
        eventKey === 'BACKSPACE'
      ) {
        this.onClick(eventKey);
      }
    }
  }

  initializeKeys(): void {
    const topRowKeys: IKey[] = this.topRowKeys.map((key) => {
      return { key: key, color: '' };
    });
    const middleRowKeys: IKey[] = this.middleRowKeys.map((key) => {
      return { key: key, color: '' };
    });
    const bottomRowKeys: IKey[] = this.bottomRowKeys.map((key) => {
      return { key: key, color: '' };
    });
    this.keyboardService.setInitializedKeys([
      ...topRowKeys,
      ...middleRowKeys,
      ...bottomRowKeys,
    ]);
  }

  getKeyColor(key: string): string {
    return this.keyboardService.getKeyColor(key);
  }

  onClick(key: string): void {
    this.keyPressed.emit(key);
  }
}
