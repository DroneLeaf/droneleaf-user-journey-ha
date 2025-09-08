import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-setup-functional-switch',
  templateUrl: './setup-functional-switch.component.html',
  styleUrls: ['./setup-functional-switch.component.scss'],
})
export class SetupFunctionalSwitchComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  cancelModalVisible = false;
  started = false;

  currentState: 'LOW' | 'MID' | 'HIGH' | null = null;
  currentStep = 1;
  currentStepLabel: 'LOW' | 'MID' | 'HIGH' | 'DONE' = 'LOW';
  stepActive = false;
  finished = false;

  // confirmation flags
  lowConfirmed = false;
  midConfirmed = false;
  highConfirmed = false;

  // set RC state
  setRC(state: 'LOW' | 'MID' | 'HIGH') {
    this.currentState = state;
    // check agar RC ka state current step se match hai
    this.stepActive = state === this.currentStepLabel;
  }

  // confirm current step
  confirmStep() {
    if (!this.stepActive) return;

    if (this.currentStepLabel === 'LOW') {
      this.lowConfirmed = true;
      this.currentStep = 2;
      this.currentStepLabel = 'MID';
    } else if (this.currentStepLabel === 'MID') {
      this.midConfirmed = true;
      this.currentStep = 3;
      this.currentStepLabel = 'HIGH';
    } else if (this.currentStepLabel === 'HIGH') {
      this.highConfirmed = true;
      this.finished = true;
      this.currentStepLabel = 'DONE';
      this.stepActive = false;
      return;
    }

    // check next step active hai ya nahi
    this.stepActive = this.currentState === this.currentStepLabel;
  }

  ngOnInit() {}

  onStart() {
    this.started = true;
  }

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
