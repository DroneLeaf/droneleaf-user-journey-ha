import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-cancel-model',
  templateUrl: './confirm-cancel-model.component.html',
  styleUrls: ['./confirm-cancel-model.component.scss'],
})
export class ConfirmCancelModelComponent  {

  @Input() show: boolean = false;
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  handleConfirm() {
    this.confirm.emit();
  }

  handleCancel() {
    this.cancel.emit();
  }

}
