import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'client-request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.scss'],
})
export class RequestButtonComponent {
  @Input() class = '';
  @Input() color = 'primary';
  @Input() disabled = false;
  @Input() label = 'button';
  @Input() isLoading = true;
  @Input() spinnerDiameter = 30;
  @Output() btnClick = new EventEmitter();

  onClick(): void {
    if (!this.isLoading) {
      this.btnClick.emit();
    }
  }
}
