import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'client-card',
  templateUrl: './card.component.html',
  styleUrls: ['../../styles.scss'],
})
export class CardComponent {
  @Input() public header = 'Header';
  @Input() public controlLabel = 'Button';
  @Input() public isLoading = false;
  @Input() public disabled = false;
  @Input() public errorMessage = '';
  @Output() public btnClick = new EventEmitter();

  onClick(): void {
    this.btnClick.emit();
  }
}
