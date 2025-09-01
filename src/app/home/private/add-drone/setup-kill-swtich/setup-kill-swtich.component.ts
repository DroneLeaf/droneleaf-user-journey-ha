import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-setup-kill-swtich',
  templateUrl: './setup-kill-swtich.component.html',
  styleUrls: ['./setup-kill-swtich.component.scss'],
})
export class SetupKillSwtichComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {

  }

  stepOneDone = false;
  stepTwoDone = false;

  markStepOneDone() {
    this.stepOneDone = true;
  }

  markStepTwoDone() {
    this.stepTwoDone = true;

  }

  isCompleted(): boolean {
    return this.stepOneDone && this.stepTwoDone;
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
