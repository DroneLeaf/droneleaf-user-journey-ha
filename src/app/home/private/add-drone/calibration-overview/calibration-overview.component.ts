import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-calibration-overview',
  templateUrl: './calibration-overview.component.html',
  styleUrls: ['./calibration-overview.component.scss'],
})
export class CalibrationOverviewComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  stepOneDone = false;
  stepTwoDone = false;
  stepThreeDone = false;
  stepFourDone = false;

  markStepOneDone() {
    this.stepOneDone = true;
  }

  markStepTwoDone() {
    this.stepTwoDone = true;
  }

  markStepThreeDone() {
    this.stepThreeDone = true;
  }

  markStepFourDone() {
    this.stepFourDone = true;
  }

  isCompleted(): boolean {
    return this.stepOneDone && this.stepTwoDone && this.stepThreeDone && this.stepFourDone;
  }

  handleNext() {

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
