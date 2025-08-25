import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  cancelModalVisible = false;

  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;

  @Output() next = new EventEmitter<number>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  axisX = '0.0';
  axisY = '0.0';
  axisZ = '0.0';

  environmentForm!: FormGroup;

  indoorPositioningTypes = ['OptiTrack', 'Vicon', 'Qualisys'];
  positioningSystemMakes = [
  { label: 'OptiTrack', value: 'OptiTrack', disabled: false },
  { label: 'Nokov', value: 'Nokov', disabled: true },
  { label: 'Vikon', value: 'Vikon', disabled: true }
];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

  ngOnInit(): void {
    this.environmentForm = this.fb.group({
      nameOfEnvironment: ['', Validators.required],
      positioningSystemType: ['', Validators.required],
      positioningSystemMake: ['', Validators.required],
      wifiSSID: ['', Validators.required],
      wifiPassword: ['', Validators.required],
      lanSubnet: ['', Validators.required],
      optiTrackMulticastAddress: ['', Validators.required],
      optiTrackServerAddress: ['', Validators.required],
      axisY: [''],
      axisX: [''],
      axisZ: [''],
    });

    // 🟢 Restore saved state if exists
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.environmentForm.patchValue(saved);
    }

    // 🟢 Auto-save whenever form changes
    this.environmentForm.valueChanges.subscribe((val) => {
      this.wizardStateService.saveStepData(this.currentStepIndex, val);
    });
  }

  // -------- Cancel Flow --------
  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.router.navigate(['/dashboard']);
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  onCancelClick() {
    this.cancel.emit();
  }

  // -------- Navigation --------
  onContinue() {
    if (this.environmentForm.valid) {
      this.wizardStateService.saveStepData(
        this.currentStepIndex,
        this.environmentForm.value
      );
      this.next.emit(this.currentStepIndex + 1); // 🔥 next step index bhejo
    } else {
      this.environmentForm.markAllAsTouched();
    }
  }

  onBack() {
    this.back.emit();
  }
}
