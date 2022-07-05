import { Component, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IKeyboard, IKeyboardRow } from '@client/data-models';
import { Store } from '@ngrx/store';
import { GameActions } from '../../+state/game.actions';
import { Observable } from 'rxjs';
import { getKeyboardRows } from '../../+state/game.selectors';

@Component({
  selector: 'client-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
  public keyboardRows$: Observable<IKeyboardRow[]>;
  @Output() public keyPressed: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store) {
    this.generateKeyboard();
    this.keyboardRows$ = this.store.select(getKeyboardRows);
  }

  @HostListener('window:keydown', ['$event']) externalKeyboardEvent(
    event: any
  ) {
    if (document.getElementById('display-keyboard')) {
      // alphabet event keycodes: 65 - 90
      const keyCode: number = event.keyCode;
      // alphabet event keycodes: 65 - 90
      const eventKey: string = event.key.toLowerCase();
      if (
        (keyCode > 64 && keyCode < 91) ||
        eventKey === 'enter' ||
        eventKey === 'backspace'
      ) {
        this.onClick(eventKey);
      }
    }
  }

  private generateKeyboard(): void {
    const rows = [
      {
        position: 'top',
        keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      },
      {
        position: 'middle',
        keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      },
      {
        position: 'bottom',
        keys: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      },
    ];
    const keyboard = {
      rows: rows.map((row) => ({
        position: row.position,
        keys: row.keys.map((key) => ({ key: key, color: '' })),
      })),
    };
    this.store.dispatch(
      GameActions.initializeKeyboard({ keyboard: keyboard as IKeyboard })
    );
  }

  public onClick(key: string): void {
    this.keyPressed.emit(key);
  }
}
