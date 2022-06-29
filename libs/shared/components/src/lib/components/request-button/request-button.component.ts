import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'client-request-button',
  templateUrl: './request-button.component.html',
})
export class RequestButtonComponent {
  @Input() public color = 'primary';
  @Input() public disabled = false;
  @Input() public label = 'button';
  @Input() public isLoading = false;
  @Output() public btnClick = new EventEmitter();

  onClick(): void {
    if (!this.isLoading) {
      this.btnClick.emit();
    }
  }
}
