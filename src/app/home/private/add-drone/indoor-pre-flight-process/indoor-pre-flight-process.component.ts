import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-indoor-pre-flight-process',
  templateUrl: './indoor-pre-flight-process.component.html',
  styleUrls: ['./indoor-pre-flight-process.component.scss'],
})
export class IndoorPreFlightProcessComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

    // -------- Cancel Flow --------
    showCancelModal() {
      this.cancelModalVisible = true;
    }

    cancelConfirmed() {
      this.cancelModalVisible = false;
    }

    cancelDismissed() {
      this.cancelModalVisible = false;
    }

    onCancelClick() {
      this.cancel.emit();
    }

}
