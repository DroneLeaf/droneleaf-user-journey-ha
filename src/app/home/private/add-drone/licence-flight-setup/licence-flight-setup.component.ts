import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-licence-flight-setup',
  templateUrl: './licence-flight-setup.component.html',
  styleUrls: ['./licence-flight-setup.component.scss'],
})
export class LicenceFlightSetupComponent implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() {}
  step1Completed = false;
  step2Completed = false;
  apiKey = 'FLIGHT-API-KEY-123456';
  copied = false;
  ngOnInit() {}

  copyApiKey() {
    navigator.clipboard.writeText(this.apiKey).then(() => {
      this.step1Completed = true;
    });
  }

  completeStep2() {
    this.step2Completed = true;
  }

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
