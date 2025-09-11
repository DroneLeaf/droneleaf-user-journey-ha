import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type RemoteControlOption = 'perform_fsac' | 'flight_operation';

@Component({
  selector: 'app-flight-setup',
  templateUrl: './flight-setup.component.html',
  styleUrls: ['./flight-setup.component.scss'],
})
export class FlightSetupComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<RemoteControlOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cancelModalVisible = false;
  selectedOption: RemoteControlOption | null = null;
  selectedDroneOption: RemoteControlOption | null = null;
  constructor() { }

  ngOnInit(): void {}


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

  selectOption(option: RemoteControlOption) {
    this.selectedOption = option;
    this.selectedDroneOption = option;
  }

  continue() {
    if (this.selectedOption) {
      this.next.emit(this.selectedOption);
    }
  }

}
