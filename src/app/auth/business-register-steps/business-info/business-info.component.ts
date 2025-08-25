import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Country,
  CountryPhoneService,
} from 'src/app/core/services/country-phone.service';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss'],
})
export class BusinessInfoComponent implements OnInit {
  phoneForm!: FormGroup;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  selectedCountry!: Country;
  searchQuery: string = '';
  search = new FormControl('');

  showDropdown: boolean = false;
  personalInfoForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private countryService: CountryPhoneService,
    private router: Router
  ) {
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
  ngOnInit() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.selectedCountry = data[0] || this.selectedCountry;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
        this.countries = [];
        this.filteredCountries = [];
      },
    });

    this.search.valueChanges.subscribe((query: any) => {
      this.onSearchChange(query);
    });

      const saved = localStorage.getItem('business.info');
  if (saved) {
    this.personalInfoForm.patchValue(JSON.parse(saved));
  }
  }

  get phoneControl(): FormControl {
    return this.personalInfoForm.get('phone') as FormControl;
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    if (query) {
      this.countryService.searchCountries(query).subscribe({
        next: (filtered) => {
          this.filteredCountries = filtered;
        },
      });
    } else {
      this.filteredCountries = this.countries;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.filteredCountries = this.countries;
      this.searchQuery = '';
    }
  }

  onCountryChange(country: Country) {
    this.selectedCountry = country;
    this.showDropdown = false;
    this.searchQuery = '';
    this.filteredCountries = this.countries;
  }

  goToLogin(){
   this.router.navigate(['auth/login']); // ✅ Relative path from inside AuthModule

  }

  onSearchCountry(event: any) {
    const query = event.target.value;
    this.filteredCountries = this.countries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
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

onSubmit() {
  if (this.personalInfoForm.valid) {
    // ✅ Save form in localStorage
    localStorage.setItem('business.info', JSON.stringify(this.personalInfoForm.value));

    this.formSubmitted.emit();
  } else {
    this.personalInfoForm.markAllAsTouched();
  }
}
}
