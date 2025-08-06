import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-custom-drone-details',
  templateUrl: './custom-drone-details.component.html',
  styleUrls: ['./custom-drone-details.component.scss'],
})
export class CustomDroneDetailsComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
  finalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  // goBack() {
  //   this.location.back();
  // }

  ngOnInit(): void {
    this.finalForm = this.fb.group({
      customDroneCount: ['', Validators.required],
      primaryUse: ['', Validators.required],
      howDidYouHear: ['', Validators.required],
      experienceLevel: [''],
      reason: [''],
    });
    const navigation = this.router.getCurrentNavigation();
    const showToast = navigation?.extras?.state?.['showToast'];

    if (showToast) {
      this.toastService.show({
        title: 'Successfully Registered!',
        message: 'Your account has been successfully registered',
        type: 'success',
        position: 'top-right',
      });
    }
  }

  get f() {
    return this.finalForm.controls;
  }

onSubmit() {
  if (this.finalForm.valid) {
    this.auth.login('private');
    sessionStorage.setItem('showSuccessToast', 'true');

    this.router.navigate(['/dashboard']);
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
