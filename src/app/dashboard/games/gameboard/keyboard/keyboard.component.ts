import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface IKey {
  key: string;
  color: string;
}

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
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
    'DELETE',
  ];
  initializedKeys: IKey[] = [];
  @Output() keyPressed: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initializeKeys();
    // this.getKeyColor('N');
    // this.setKeyColor([{ key: 'A', color: 'correct-key' }]);
  }

  initializeKeys() {
    const topRowKeys: IKey[] = this.topRowKeys.map((key) => {
      return { key: key, color: '' };
    });
    const middleRowKeys: IKey[] = this.middleRowKeys.map((key) => {
      return { key: key, color: '' };
    });
    const bottomRowKeys: IKey[] = this.bottomRowKeys.map((key) => {
      return { key: key, color: '' };
    });

    this.initializedKeys = [...topRowKeys, ...middleRowKeys, ...bottomRowKeys];
    console.log(this.initializedKeys);
  }

  setKeyColor(keyMap: IKey[]) {
    // const correctClass: string = 'correct-key';
    // const incorrectClass: string = 'incorrect-key';
    // const closeClass: string = 'close-key';

    for (let key of keyMap) {
      this.initializedKeys = this.initializedKeys.map((item) =>
        item.key === key.key ? { key: key.key, color: key.color } : item
      );
    }
  }

  getKeyColor(key: string): string {
    return this.initializedKeys.filter((item) => item.key === key)[0].color;
  }

  onClick(key: string) {
    // console.log('event: ', this.initializeKeys);
    this.keyPressed.emit(key);
  }
}
