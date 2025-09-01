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
  @Input() currentStepIndex!: number; // comes from parent stepper

  cancelModalVisible = false;
  started = false;
  finished = false;

  // Local step list with description
  step = [
    { label: 'Step 1: Switch A - Low', description: 'Make sure Switch A is assigned to Channel 11. Move the switch to the lowest position, then press Done.', done: false },
    { label: 'Step 2: Switch A - Mid', description: 'Move Switch A to the middle position, then press Done.', done: false },
    { label: 'Step 3: Switch A - High', description: 'Move Switch A to the highest position, then press Done.', done: false },
    { label: 'Step 4: Switch B - OFF', description: 'Make sure Switch B is assigned to Channel 12. Keep the switch in the default (OFF) position, then press Done.', done: false },
    { label: 'Step 5: Switch B - ON', description: 'Move Switch B to the engaged (ON) position, then press Done.', done: false }
  ];

  activeStepIndex = 0;

  ngOnInit() {}

  onStart() {
    this.started = true;
  }

  markDone(index: number) {
    this.step[index].done = true;

    if (index < this.step.length - 1) {
      this.activeStepIndex = index + 1;
    } else {
      this.finished = true;
    }
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
