import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.scss'],
})
export class RequestButtonComponent implements OnInit {
  @Input() class: string = '';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() label: string = 'button';
  @Input() isLoading: boolean = true;
  @Input() spinnerDiameter: number = 30;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    if (!this.isLoading) {
      this.btnClick.emit();
    }
  }
}
