import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-select-drone-step',
  templateUrl: './select-drone-step.component.html',
  styleUrls: ['./select-drone-step.component.scss'],
})
export class SelectDroneStepComponent  {
  cancelModalVisible = false;

 @Input() steps!: Step[];
  @Input() currentStepIndex!: number;

  @Output() next = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  selectedDroneOption: string | null = null;
constructor(private router: Router) {}
  selectOption(option: string) {
    this.selectedDroneOption = option;
  }

continue() {
  if (this.selectedDroneOption) {
    this.next.emit(this.selectedDroneOption); // send selected value to parent
  }
}

 showCancelModal() {
    this.cancelModalVisible = true;
  }


   cancelConfirmed() {
    this.cancelModalVisible = false;
    console.log('Cancelled');
    this.router.navigate(['/dashboard']);
  }

  // Called when user closes the modal
  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  goBack() {
    this.back.emit();
  }

  @Output() cancel = new EventEmitter<void>();

onCancelClick() {
  this.cancel.emit();
}


}
