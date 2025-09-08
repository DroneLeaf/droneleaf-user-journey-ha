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
  stepEngageDone = false;
  stepReleaseDone = false;
  stepFinishDone = false;
    currentState: 'ON' | 'OFF' = 'OFF';
    actionButton: string = 'Start Verification';
  constructor() { }
  logs: string[] = ['Logs will appear here...'];
  ngOnInit() {

  }
  stepEngageActive = false;
stepReleaseActive = false;
stepFinishActive = false;


  setSwitch(state: 'ON' | 'OFF') {
    this.currentState = state;
  }

  startVerification() {
    this.logs = [];
    this.actionButton = 'Waiting for ON...';

    // Step 1 (Engage)
    this.logs.push(
      '• Setup started. Ensure the kill-switch is assigned to Channel 7 (two-position latching recommended).'
    );
    this.stepEngageDone = true;

    setTimeout(() => {
      this.logs.push('• Kill-switch engaged (CH7=1800). Proceeding to release…');
      this.actionButton = 'Waiting for OFF...';
      this.currentState = 'ON';
      this.stepReleaseDone = true;

      // Step 2 (Release)
      setTimeout(() => {
        this.logs.push('• Kill-switch released (CH7=1100). Setup complete.');
        this.actionButton = 'Retest';
        this.currentState = 'OFF';
        this.stepFinishDone = true;
      }, 2000);
    }, 2000);
  }

  /** Reset flow */
  retest() {
    this.currentState = 'OFF';
    this.actionButton = 'Start Verification';
    this.logs = ['Logs will appear here...'];
    this.stepEngageDone = false;
    this.stepReleaseDone = false;
    this.stepFinishDone = false;
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
