import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-rc-setup-switch-b',
  templateUrl: './rc-setup-switch-b.component.html',
  styleUrls: ['./rc-setup-switch-b.component.scss'],
})
export class RCSetupSwitchBComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  currentState: 'DEFAULT' | 'ENGAGED' | null = 'DEFAULT';

  currentStep = 1;
  currentStepLabel: 'DEFAULT' | 'ENGAGED' = 'DEFAULT';
  stepActive = true; // step 1 pe Default hi match hai
  finished = false;
  defaultConfirmed = false;
engagedConfirmed = false;
allConfirmed = false;

  setRC(state: 'DEFAULT' | 'ENGAGED') {
    this.currentState = state;
    this.stepActive = state === this.currentStepLabel;
  }

  // confirm button
  confirmStep() {
    if (this.currentStepLabel === 'DEFAULT' && this.currentState === 'DEFAULT') {
      this.defaultConfirmed = true;
      this.currentStep = 2;
      this.currentStepLabel = 'ENGAGED';
    } else if (this.currentStepLabel === 'ENGAGED' && this.currentState === 'ENGAGED') {
      this.engagedConfirmed = true;
      this.allConfirmed = true; // Hide step box, show success
    }

    this.stepActive = this.currentState === this.currentStepLabel;
  }

  constructor() { }

  ngOnInit() {}


  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

}
