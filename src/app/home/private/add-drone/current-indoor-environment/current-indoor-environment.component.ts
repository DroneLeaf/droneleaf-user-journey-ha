import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type RemoteControlOption = 'yes' | 'no';

@Component({
  selector: 'app-current-indoor-environment',
  templateUrl: './current-indoor-environment.component.html',
  styleUrls: ['./current-indoor-environment.component.scss'],
})
export class CurrentIndoorEnvironmentComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<RemoteControlOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cancelModalVisible = false;
  selectedOption: RemoteControlOption | null = null;
  selectedDroneOption: RemoteControlOption | null = null;
  constructor() { }

  ngOnInit() {}

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
