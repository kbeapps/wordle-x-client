import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'client-request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.scss'],
})
export class RequestButtonComponent {
  @Input() public class = '';
  @Input() public color = 'primary';
  @Input() public disabled = false;
  @Input() public label = 'button';
  @Input() public spinnerDiameter = 30;
  @Output() public btnClick = new EventEmitter();
  public loading = true;

  @Input() set isLoading(loadState: boolean | null) {
    this.loading = loadState !== null ? loadState : false;
  }

  onClick(): void {
    if (!this.loading) {
      this.btnClick.emit();
    }
  }
}
