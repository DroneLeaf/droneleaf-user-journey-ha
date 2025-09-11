import { Component, Input, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() control!: FormControl | AbstractControl | any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string = '';
  @Input() helperText: string = '';
  @Input() icon: string = '';
  @Input() required: boolean = false;
  @Input() clearInput: boolean = false;
  @Input() maxlength: number | undefined | any = undefined;
  @Input() textarea: boolean = false;
  @Input() showTooltip: boolean = false;

  @Input() tooltipText: string = '';
  @Input() tooltipImage: string = '';

  private componentId: string = '';

  ngOnInit() {
    this.componentId = this.generateUniqueId();
  }

  showPassword: boolean = false;

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

get isInvalid(): boolean {
  return this.control ? this.control.invalid && (this.control.touched || this.control.dirty) : false;
}


  get isValid(): boolean {
    return this.control
      ? this.control.valid && this.control.touched && !!this.control.value
      : false;
  }

  get showError(): boolean {
    return (
      this.isInvalid && (!!this.errorMessage || this.hasValidationErrors())
    );
  }

  get isPending(): boolean {
    return this.control ? this.control.pending : false;
  }

  generateId(): string {
    return this.componentId;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  hasValidationErrors(): boolean {
    return this.control ? !!this.control.errors : false;
  }

  getErrorMessage(): string {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    if (this.control && this.control.errors) {
      const errors = this.control.errors;

      // Default Angular validators
      if (errors['required']) {
        return `${this.label || 'This field'} is required.`;
      }
      if (errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (errors['minlength']) {
        return `Minimum length is ${errors['minlength'].requiredLength} characters. Current length: ${errors['minlength'].actualLength}.`;
      }
      if (errors['maxlength']) {
        return `Maximum length is ${errors['maxlength'].requiredLength} characters. Current length: ${errors['maxlength'].actualLength}.`;
      }
      if (errors['pattern']) {
        return 'Please enter a valid format.';
      }

      // 🚀 Custom Password Errors
      if (errors['uppercase']) return errors['uppercase'];
      if (errors['lowercase']) return errors['lowercase'];
      if (errors['digit']) return errors['digit'];
      if (errors['specialChar']) return errors['specialChar'];
      if (errors['personalInfo']) return errors['personalInfo'];
      if (errors['sequence']) return errors['sequence'];
      if (errors['repeated']) return errors['repeated'];
      if (errors['mismatch']) return 'Passwords do not match.';
      if (errors['hasNumbers']) return 'Numbers are not allowed in name fields.';

      // Catch-all
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        return `Invalid ${this.label?.toLowerCase() || 'input'}.`;
      }
    }

    return '';
  }

  // Helper method to get all error keys (useful for debugging)
  getErrorKeys(): string[] {
    return this.control && this.control.errors
      ? Object.keys(this.control.errors)
      : [];
  }

  // Method to manually trigger validation
  validateField(): void {
    if (this.control) {
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
  }

  // Method to clear errors
  clearErrors(): void {
    if (this.control) {
      this.control.setErrors(null);
    }
  }
}
