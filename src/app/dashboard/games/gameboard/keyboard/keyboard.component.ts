import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService, IKey } from './keyboard.service';

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
  keyboardStateSubscription: Subscription = new Subscription();
  @Output() keyPressed: EventEmitter<any> = new EventEmitter();

  constructor(private keyboardService: KeyboardService) {
    this.keyboardStateSubscription = this.keyboardService
      .watchInitializedKeys()
      .subscribe((keyState: IKey[]) => (this.initializedKeys = keyState));
  }

  ngOnInit(): void {
    this.initializeKeys();
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
    const foundColor: IKey | undefined = this.initializedKeys.find(
      (item) => item.key === key
    );
    return foundColor ? foundColor.color : '';
  }

  onClick(key: string): void {
    this.keyPressed.emit(key);
  }
}
