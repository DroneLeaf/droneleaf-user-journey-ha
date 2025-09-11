import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-no-indoor-environment',
  templateUrl: './no-indoor-environment.component.html',
  styleUrls: ['./no-indoor-environment.component.scss'],
})
export class NoIndoorEnvironmentComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  activeStep = 0;
  cancelModalVisible = false;
  constructor() { }

  step1 = { completed: false, loading: false, success: false };
  step2 = { completed: false, loading: false, success: false, result: null as string | null };
  step3 = { completed: false, success: false };
  step4 = { completed: false, success: false, input: '' };
  step5 = { completed: false, loading: false, success: false };
  handleStep1() {
    this.step1.loading = true;
    setTimeout(() => {
      this.step1.loading = false;
      this.step1.success = true;
      this.step1.completed = true;
    }, 1500);
  }

  handleStep2() {
    this.step2.loading = true;
    setTimeout(() => {
      this.step2.loading = false;
      this.step2.success = true;
      this.step2.completed = true;
      this.step2.result = `192.168.11.${Math.floor(Math.random() * 100)}`;
    }, 1500);
  }

  handleStep3() {
    this.step3.success = true;
    this.step3.completed = true;
  }

  handleStep4() {
    if (this.step4.input.trim()) {
      this.step4.success = true;
      this.step4.completed = true;
    }
  }

  handleStep5() {
    this.step5.loading = true;
    setTimeout(() => {
      this.step5.loading = false;
      this.step5.success = true;
      this.step5.completed = true;
    }, 1500);
  }

  get allStepsCompleted(): boolean {
    return this.step1.completed &&
           this.step2.completed &&
           this.step3.completed &&
           this.step4.completed &&
           this.step5.completed;
  }


  goNextStep(stepIndex: number) {
    this.activeStep = stepIndex;
  }
  ngOnInit() {}
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
