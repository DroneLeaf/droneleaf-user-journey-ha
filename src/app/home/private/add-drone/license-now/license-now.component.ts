import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-license-now',
  templateUrl: './license-now.component.html',
  styleUrls: ['./license-now.component.scss'],
})
export class LicenseNowComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() { }
  price: number = 500;
  promoCode: string = '';
  discount: number = 0;
  loading: boolean = false;
  licenseActivated: boolean = false;
  ngOnInit() {}

  applyPromo() {
    const length = this.promoCode.trim().length;

    if (length === 0) {
      this.discount = 0;
      return;
    }

    // Dynamic formula: (length * 2)% of price
    // Example: 5 letters => 10% discount
    let discountPercent = length * 2;

    // Max 50% cap
    if (discountPercent > 50) {
      discountPercent = 50;
    }

    this.discount = this.price * (discountPercent / 100);
  }


  get subtotal() {
    return this.price;
  }

  get total() {
    return this.price - this.discount;
  }

  checkout() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.licenseActivated = true;
    }, 2000); // simulate 2s API call
  }

    // -------- Cancel Flow --------
    showCancelModal() {
      this.cancelModalVisible = true;
    }

    cancelConfirmed() {
      this.cancelModalVisible = false;
    }

    cancelDismissed() {
      this.cancelModalVisible = false;
    }

    onCancelClick() {
      this.cancel.emit();
    }

}
