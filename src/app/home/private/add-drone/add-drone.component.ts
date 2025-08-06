import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.scss'],
})
export class AddDroneComponent implements OnInit {
  currentStepIndex = 0;
  selectedDroneOption: any | null = null;
  @Output() close = new EventEmitter<void>();
  selectedMethod: any | null = null;

  steps = [
    { title: 'Drone Type', completed: false },
    { title: 'Environment', completed: false },
    { title: 'Flight Range', completed: false },
    { title: 'Camera Setup', completed: false },
    { title: 'Insurance', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
    { title: 'Confirmation', completed: false },
  ];

  constructor(private router: Router) {}

  // parent.component.ts
  goToStep(stepIndex: number, droneOptionOrMethod?: string) {
    if (stepIndex > this.currentStepIndex) {
      this.steps[this.currentStepIndex].completed = true;
    }

    this.currentStepIndex = stepIndex;

    if (
      [
        'custom',
        'organization',
        'marketplaceTemplate',
        'droneMarketplace',
      ].includes(droneOptionOrMethod || '')
    ) {
      this.selectedDroneOption = droneOptionOrMethod;
    }
    if (['tier1', 'tier2', 'already'].includes(droneOptionOrMethod || '')) {
      this.selectedMethod = droneOptionOrMethod;

      if (droneOptionOrMethod === 'tier1') {
        this.currentStepIndex = 7;
      }
    }
  }

  handleChooseMethod(method: string) {
    this.selectedMethod = method;

    if (method === 'tier1') {
      this.currentStepIndex = 7;
    }
  }

  // called when child says cancel
  handleCancel() {
    this.close.emit();
  }

  cancelModalVisible = false;

  handleStepCancel() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.close.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  closeWizard(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {}
}
