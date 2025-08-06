import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  cancelModalVisible = false;
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<number>();
  @Output() back = new EventEmitter<void>();

  environmentForm!: FormGroup;

  indoorPositioningTypes = ['OptiTrack', 'Vicon', 'Qualisys'];
  positioningSystemMakes = ['Make 1', 'Make 2', 'Make 3'];

  constructor(private fb: FormBuilder, private router: Router) {}

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
      axisX: ['', Validators.required],
      axisY: ['', Validators.required],
      axisZ: ['', Validators.required],
    });
  }

  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    console.log('Cancelled');
    this.router.navigate(['/dashboard']); // Or whatever route
  }

  onContinue() {
    if (this.environmentForm.valid) {
      this.next.emit(4);
    } else {
      this.environmentForm.markAllAsTouched();
    }
  }
  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  onBack() {
    this.back.emit();
  }

  @Output() cancel = new EventEmitter<void>();

  onCancelClick() {
    this.cancel.emit();
  }
}
