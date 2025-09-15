import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  finalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.finalForm = this.fb.group({
      organizationName: ['', Validators.required],
      primaryUse: ['', Validators.required],
      collaborators: ['', Validators.required],
      experienceLevel: [''],
      otherPrimaryUse: [''],
      pilots: [''],
    });

    this.finalForm.get('primaryUse')?.valueChanges.subscribe((val) => {
      const otherCtrl = this.finalForm.get('otherPrimaryUse');
      if (val === 'Other') {
        otherCtrl?.setValidators([Validators.required]);
      } else {
        otherCtrl?.clearValidators();
      }
      otherCtrl?.updateValueAndValidity();
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

    // ✅ Restore if exists
    const saved = localStorage.getItem('business.company');
    if (saved) {
      this.finalForm.patchValue(JSON.parse(saved));
    }
  }

  get f() {
    return this.finalForm.controls;
  }

  goToBusniessDashboard() {
    // ✅ Assume business registered successfully
    // this.authService.login('business'); // 🔥 Login & set role properly
    // this.router.navigate(['/business-dashboard']);
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  onSubmit(): void {
    if (this.finalForm.valid) {
      // ✅ Save company details
      localStorage.setItem(
        'business.company',
        JSON.stringify(this.finalForm.value)
      );

      this.formSubmitted.emit();

      // Use the same approach as personal registration - set sessionStorage flag
      sessionStorage.setItem('showSuccessToast', 'true');

      // Login as business user
      this.authService.login('business');

      // Navigate to business dashboard
      this.router.navigate(['/business-dashboard']);
    } else {
      this.finalForm.markAllAsTouched();
    }
  }

  primaryUseOptions = [
    'Research & Development',
    'Academia',
    'Surveillance',
    'Tech',
    'Warehousing',
    'Other',
  ];
}
