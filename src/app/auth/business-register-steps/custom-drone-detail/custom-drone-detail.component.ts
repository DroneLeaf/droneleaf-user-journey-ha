import { ToastService } from './../../../core/services/toast.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-drone-detail',
  templateUrl: './custom-drone-detail.component.html',
  styleUrls: ['./custom-drone-detail.component.scss'],
})
export class CustomDroneDetailComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
  finalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.finalForm = this.fb.group({
      customDroneCount: ['', Validators.required],
      primaryUse: ['', Validators.required],
      howDidYouHear: ['', Validators.required],
      experienceLevel: [''],
      reason: [''],
    });

    const saved = localStorage.getItem('business.customDrone');
    if (saved) {
      this.finalForm.patchValue(JSON.parse(saved));
    }
  }

  get f() {
    return this.finalForm.controls;
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  onSubmit() {
    if (this.finalForm.valid) {
      // ✅ Save to localStorage
      localStorage.setItem(
        'business.customDrone',
        JSON.stringify(this.finalForm.value)
      );

      console.log('✅ Final form submitted:', this.finalForm.value);
      this.formSubmitted.emit();
    } else {
      this.finalForm.markAllAsTouched();
    }
  }

  primaryUseOptions = ['Inspection', 'Monitoring ', 'Surveillance'];

  hearOptions = [
    'Social Media',
    'Friend',
    'YouTube',
    'Google Search',
    'Event / Conference',
    'Other',
  ];

  experienceOptions = [
    'Just starting',
    'Hobbyist',
    'Professional',
    'Commercial operator',
  ];
}
