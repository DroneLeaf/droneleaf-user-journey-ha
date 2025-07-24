import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Country, CountryPhoneService } from '../../services/country-phone.service';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent  implements OnInit {
 @Input() control!: FormControl;
  @Input() label: string = 'Phone Number';
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;


  countries: Country[] = [];
  filteredCountries: Country[] = [];
  selectedCountry!: Country;
  showDropdown: boolean = false;
  searchQuery: string = '';

  constructor(private countryService: CountryPhoneService) {}

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const clickedInside = this.dropdownRef?.nativeElement.contains(event.target);
  if (!clickedInside) {
    this.showDropdown = false;
  }
}


  ngOnInit() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.selectedCountry = data[0];
      },
      error: () => {
        this.countries = [];
        this.filteredCountries = [];
      },
    });
  }

  get isInvalid(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

  get isValid(): boolean {
    return this.control?.valid && this.control?.touched;
  }

  get showError(): boolean {
  return this.isInvalid && (!!this.errorMessage || !!this.control?.errors);
}


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.filteredCountries = this.countries;
      this.searchQuery = '';
    }
  }


  allowOnlyNumbers(event: KeyboardEvent): void {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

preventNonNumericPaste(event: ClipboardEvent): void {
  const pastedText = event.clipboardData?.getData('text') || '';
  if (!/^\d+$/.test(pastedText)) {
    event.preventDefault();
  }
}

  onCountryChange(country: Country) {
    this.selectedCountry = country;
    this.showDropdown = false;
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filteredCountries = this.countries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getErrorMessage(): string {
    if (this.errorMessage) return this.errorMessage;
    if (this.control?.hasError('required')) return `${this.label} is required.`;
    if (this.control?.hasError('pattern')) return 'Please enter a valid phone number.';
    return 'Invalid phone number';
  }
}
