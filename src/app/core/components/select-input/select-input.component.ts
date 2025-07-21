import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit {
  @Input() control!: FormControl | AbstractControl | any;
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() errorMessage: string = '';
  @Input() helperText: string = '';
  @Input() required: boolean = false;
  @Input() icon: string = ''; // custom fallback if needed

  isOpen: boolean = false;
  private componentId: string = '';

  ngOnInit() {
    this.componentId = this.generateUniqueId();
  }

  // When user clicks on select
  onMouseDown() {
    this.isOpen = true;
  }

  // When user picks value or dropdown loses focus
  onCloseEvent() {
    this.isOpen = false;
  }

  get currentIcon(): string {
    if (this.icon) return this.icon;
    return this.isOpen ? 'chevron-up-outline' : 'chevron-down-outline';
  }

  get isInvalid(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

  get isValid(): boolean {
    return this.control?.valid && this.control?.touched && !!this.control?.value;
  }

  get showError(): boolean {
    return this.isInvalid && (!!this.errorMessage || this.hasValidationErrors());
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
    if (this.errorMessage) return this.errorMessage;

    const errors = this.control?.errors;
    if (errors?.['required']) return `${this.label || 'This field'} is required.`;

    return 'Invalid selection.';
  }
}
