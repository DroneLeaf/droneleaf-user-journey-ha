import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';


type StepThreeOption = 'license_now' | 'skip_now';
@Component({
  selector: 'app-license-now-later',
  templateUrl: './license-now-later.component.html',
  styleUrls: ['./license-now-later.component.scss'],
})
export class LicenseNowLaterComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor(   private wizardStateService: AddDroneWizardStateService) { }

  ngOnInit() {}
  selectedOption: StepThreeOption | null = null;

  continue() {
    if (this.selectedOption) {
      // 🟢 Ensure latest selection saved
      this.wizardStateService.saveStepData(this.currentStepIndex, {
        selectedOption: this.selectedOption,
      });
      this.next.emit();
    }
  }

  selectOption(option: StepThreeOption) {
    this.selectedOption = option;

    // 🟢 Save immediately when user selects
    this.wizardStateService.saveStepData(this.currentStepIndex, {
      selectedOption: this.selectedOption,
    });
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
