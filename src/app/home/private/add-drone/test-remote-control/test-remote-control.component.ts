import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-test-remote-control',
  templateUrl: './test-remote-control.component.html',
  styleUrls: ['./test-remote-control.component.scss'],
})
export class TestRemoteControlComponent implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  started = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  progress: number = 100;
  loading: boolean = false;
  done: boolean = false;
  testingStepIndex: number = 0;
  cancelModalVisible = false;
box: any;
  constructor() {}

  ngOnInit() {}

 stepsFlow: any = [
  { title: 'Throttle (North)', value: null, active: false },
  { title: 'Throttle (South)', value: null, active: false },
  { title: 'Yaw (East)', value: null, active: false },
  { title: 'Yaw (West)', value: null, active: false },
  { title: 'Pitch (North)', value: null, active: false },
  { title: 'Pitch (South)', value: null, active: false },
  { title: 'Roll (East)', value: null, active: false },
  { title: 'Roll (West)', value: null, active: false },
];

leftBoxes = this.stepsFlow.slice(0, 4);   // Group 1
rightBoxes = this.stepsFlow.slice(4, 8);

showAllBoxes = false;

  get Math() {
    return Math;
  }

  onStart() {
    this.started = true;
    if (this.loading || this.done) return;
    this.startLoader();
  }

  startLoader() {
    this.loading = true;
    this.done = false;
    this.progress = 100;

    const interval = setInterval(() => {
      if (this.progress > 0) {
        this.progress -= 1; // 100 → 0
      } else {
        clearInterval(interval);
        this.loading = false;


        const randomVal = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        this.stepsFlow[this.testingStepIndex].value = randomVal;
        this.stepsFlow[this.testingStepIndex].active = true;


        if (this.testingStepIndex < this.stepsFlow.length - 1) {
          this.testingStepIndex++;
        } else {
          this.done = true;
        }
      }
    }, 50);
  }


  get allStepsCompleted(): boolean {
    return this.stepsFlow.every((step: { active: any; }) => step.active);
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
