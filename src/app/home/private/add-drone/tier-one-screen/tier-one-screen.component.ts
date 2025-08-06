import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-tier-one-screen',
  templateUrl: './tier-one-screen.component.html',
  styleUrls: ['./tier-one-screen.component.scss'],
})
export class TierOneScreenComponent implements OnInit {
  @Input() steps: Step[] = [];
  @Input() currentStepIndex: number = 0;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      ip: new FormControl('', [Validators.required]),
    });
  }

  get ipControl(): FormControl {
  return this.form.get('ip') as FormControl;
}


  openDashboard() {
    const ip = this.form.get('ip')?.value;
    if (ip) {
      const url = `http://${ip}`; // You can change this if port/path needed
      window.open(url, '_blank');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.next.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
