import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-drone-moter-test',
  templateUrl: './drone-moter-test.component.html',
  styleUrls: ['./drone-moter-test.component.scss'],
})
export class DroneMoterTestComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  escValue: number = 1000;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  showMessage = false;
  cancelModalVisible = false;

  step: number = 1;
  propellersRemoved: boolean | null = null;
  motorTestResult: 'yes' | 'no' | 'some' | null = null;

  constructor(private wizardStateService: AddDroneWizardStateService) {}

  ngOnInit() {
    // 🟢 Restore saved state if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.step = saved.step ?? 1;
      this.propellersRemoved = saved.propellersRemoved ?? null;
      this.motorTestResult = saved.motorTestResult ?? null;
    }
  }

  setMotorStatus(status: 'none' | 'some' | 'all') {
    if (status === 'none') {
      this.escValue = 1025;
      this.motorTestResult = 'no';
    } else if (status === 'some') {
      this.escValue = 1050;
      this.motorTestResult = 'some';
    } else if (status === 'all') {
      this.escValue = Math.floor(Math.random() * (1200 - 1100 + 1)) + 1100;
      this.showMessage = true;
      this.motorTestResult = 'yes';
    }

    this.step = 3;
    this.saveState();
  }


  onMotorResultClick(result: 'yes' | 'no' | 'some') {
    this.motorTestResult = result;

    if (result === 'yes') {
      // ✅ Validation handled here, Continue button will enable automatically
      this.saveState();
      return;
    }

    // ❌ / ⚠️ case → Increase slider value and stay in step 2
    const stepSize = 25;
    if (this.escValue < 1200) {
      this.escValue = Math.min(this.escValue + stepSize, 1200);
    }

    // Back to Step 2 so user retries
    this.step = 2;
    this.motorTestResult = null;
    this.saveState();
  }

  // ✅ Save current state
  private saveState() {
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      step: this.step,
      propellersRemoved: this.propellersRemoved,
      motorTestResult: this.motorTestResult,
    });
  }

  continue() {
    if (this.step === 3 && this.motorTestResult === 'yes') {
      this.saveState();
      this.next.emit();
    }
  }


  confirmMotorStatus() {
    // After confirming, go to step 3 and show result selection
    this.step = 3;
    this.motorTestResult = null; // reset any old result
    this.saveState();
  }
  // Change this method in drone-moter-test.component.ts
  onSelectMotorResult(result: 'yes' | 'no' | 'some') {
    this.motorTestResult = result;
    this.step = 3; // Always move to step 3 to show results
    this.saveState();
  }

  // Update this method
  handleMotorButtonClick() {
    if (this.step === 1 && this.propellersRemoved) {
      this.step = 2;
      this.motorTestResult = null;
      this.escValue = 1000; // ✅ Reset slider to starting value every time Step 2 opens
    } else if (this.step === 3 && this.motorTestResult === 'no') {
      this.motorTestResult = null;
      this.step = 2;
      this.escValue = 1000; // ✅ Reset again when retrying
    }
    this.saveState();
  }



  isMotorBtnDisabled(): boolean {
    if (this.step === 1) {
      return this.propellersRemoved !== true;
    }
    if (this.step === 2) {
      return this.motorTestResult !== null; // Disable during selection
    }
    if (this.step === 3) {
      return this.motorTestResult !== 'no'; // Only enable for 'no' result
    }
    return true;
  }

  motorBtnLabel(): string {
    if (this.step === 3 && this.motorTestResult === 'no') {
      return 'Retry Motor Test';
    }
    return 'Start Motor Test';
  }

  motorBtnClasses(): string {
    if (this.isMotorBtnDisabled()) {
      return 'bg-gray-200 text-gray-500 cursor-not-allowed';
    }
    if (
      (this.step === 1 && this.propellersRemoved) ||
      (this.step === 3 && this.motorTestResult === 'no')
    ) {
      return 'bg-[#009169] hover:bg-[#007a58] text-white';
    }
    return 'bg-gray-200 text-gray-500';
  }

  handlePropellersSelection(value: boolean) {
    this.propellersRemoved = value;
    this.saveState();
  }

  retryMotorTest() {
    this.step = 2;
    this.motorTestResult = null;
    this.saveState();
  }

  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.wizardStateService.clear(); // ✅ saara wizard state clear
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }
}
