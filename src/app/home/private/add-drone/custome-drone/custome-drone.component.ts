import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-custome-drone',
  templateUrl: './custome-drone.component.html',
  styleUrls: ['./custome-drone.component.scss'],
})
export class CustomeDroneComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @Input() steps: Step[] = [];
  @Input() currentStepIndex!: any;

  cancelModalVisible = false;
  form!: FormGroup;

  applicationOptions: string[] = ['Inspection', 'Surveillance','Anti-drone','Education','Workshop','Research','Entertainment'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wizardStateService: AddDroneWizardStateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      templateName: ['', Validators.required],
      application: ['', Validators.required],
      description: [''],
    });

    // 🟢 Restore saved state if available
    const saved = this.wizardStateService.getStepData(this.currentStepIndex);
    if (saved) {
      this.form.patchValue({
        templateName: saved.templateName || '',
        application: saved.application || '',
        description: saved.description || '',
      });
    }

    // 🟢 Auto-save on every change
    this.form.valueChanges.subscribe((val) => {
      this.wizardStateService.saveStepData(this.currentStepIndex, val);
    });
  }

  // Cancel button clicked
  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.wizardStateService.clear(); // 🟢 clear full wizard state
    this.cancel.emit();
    this.router.navigate(['/dashboard']); // optional navigation
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  submit(): void {
    if (this.form.valid) {
      // save final state explicitly
      this.wizardStateService.saveStepData(
        this.currentStepIndex,
        this.form.value
      );
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
