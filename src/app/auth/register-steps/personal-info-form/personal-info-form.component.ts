import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnInit {
  personalInfoForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private router: Router) {
    this.personalInfoForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2), this.noNumbersValidator]],
        lastName: ['', [Validators.required, Validators.minLength(2), this.noNumbersValidator]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            PasswordValidator.strongPassword(['username', 'email']),
          ],
        ],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
        marketing: [false],
      },
      {
        validators: PasswordValidator.matchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('register.personalInfo');
    if (saved) {
      this.personalInfoForm.patchValue(JSON.parse(saved));
    }
  }

  get firstName() {
    return this.personalInfoForm.get('firstName');
  }
  get lastName() {
    return this.personalInfoForm.get('lastName');
  }
  get phone() {
    return this.personalInfoForm.get('phone');
  }
  get email() {
    return this.personalInfoForm.get('email');
  }
  get password() {
    return this.personalInfoForm.get('password');
  }
  get confirmPassword() {
    return this.personalInfoForm.get('confirmPassword');
  }
  get terms() {
    return this.personalInfoForm.get('terms');
  }

  get phoneControl(): FormControl {
    return this.personalInfoForm.get('phone') as FormControl;
  }

  goToLogin() {
    this.router.navigate(['auth/login']); // ✅ Relative path from inside AuthModule
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      // ✅ Save to local storage
      localStorage.setItem(
        'register.personalInfo',
        JSON.stringify(this.personalInfoForm.value)
      );

      this.formSubmitted.emit();
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }

  // Custom validator to prevent numbers in name fields
  noNumbersValidator(control: any) {
    if (!control.value) return null;

    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { hasNumbers: true } : null;
  }

  // Method to prevent numbers on keypress
  preventNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    // Allow letters, spaces, and special characters but not numbers (48-57)
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  }

  // Method to prevent numeric paste
  preventNumericPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') || '';
    // Check if pasted text contains numbers
    if (/\d/.test(pastedText)) {
      event.preventDefault();
    }
  }
}
