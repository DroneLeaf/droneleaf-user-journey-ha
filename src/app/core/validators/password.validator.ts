import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static strongPassword(forbiddenWords: string[] = []): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) return null;

      const errors: any = {};

      // 1️⃣ Length
      if (value.length < 8) {
        errors.minlength = { requiredLength: 8, actualLength: value.length };
      }

      // 2️⃣ Character variety
      if (!/[A-Z]/.test(value)) {
        console.log('❌ Missing uppercase'); // 👀 Debugging line
        errors.uppercase = 'At least one uppercase letter required.';
      }

      if (!/[a-z]/.test(value)) {
        console.log('❌ Missing lowercase');
        errors.lowercase = 'At least one lowercase letter required.';
      }

      if (!/[0-9]/.test(value)) {
        console.log('❌ Missing digit');
        errors.digit = 'At least one digit required.';
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        console.log('❌ Missing special char');
        errors.specialChar = 'At least one special character required.';
      }

      // 3️⃣ Restrictions
      for (const word of forbiddenWords) {
        if (word && value.toLowerCase().includes(word.toLowerCase())) {
          errors.personalInfo = 'Password must not contain personal info.';
          break;
        }
      }

      // avoid sequences like abcd or 1234
      if (/(0123|1234|2345|abcd|qwerty)/i.test(value)) {
        errors.sequence =
          'Password must not contain sequences like 1234 or abcd.';
      }

      // avoid repeated chars like 1111
      if (/(.)\1{2,}/.test(value)) {
        errors.repeated = 'Password must not contain repeated characters.';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  // Confirm password validator
  static matchPassword(
    passwordControlName: string,
    confirmPasswordControlName: string
  ) {
    return (formGroup: any) => {
      const passwordControl = formGroup.controls[passwordControlName];
      const confirmPasswordControl =
        formGroup.controls[confirmPasswordControlName];

      if (!passwordControl || !confirmPasswordControl) return null;

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }
}
