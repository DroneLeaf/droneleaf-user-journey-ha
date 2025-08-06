import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-custome-drone',
  templateUrl: './custome-drone.component.html',
  styleUrls: ['./custome-drone.component.scss'],
})
export class CustomeDroneComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Input() steps: Step[] = [];
  @Input() currentStepIndex!: number;
  cancelModalVisible = false;

  form!: FormGroup;

  applicationOptions: string[] = ['Agri', 'Survey'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      templateName: ['', Validators.required],
      application: ['', Validators.required],
      description: [''],
    });
  }

  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;

    // 🔥 Place your cancel logic here
    // e.g. navigate, reset form, etc
    console.log('Cancelled');
    this.router.navigate(['/dashboard']); // Or whatever route
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  submit(): void {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  @Output() cancel = new EventEmitter<void>();

  onCancelClick() {
    this.cancel.emit();
  }
}
