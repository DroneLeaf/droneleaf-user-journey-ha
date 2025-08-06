import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnInit {
  personalInfoForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  constructor(private fb: FormBuilder,  private router: Router) {
    this.personalInfoForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
        marketing: [false],
      },
      { validator: this.passwordMatchValidator }
    );
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  ngOnInit() {}

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

  goToLogin(){
   this.router.navigate(['auth/login']); // ✅ Relative path from inside AuthModule

  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      this.formSubmitted.emit();
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }
}
