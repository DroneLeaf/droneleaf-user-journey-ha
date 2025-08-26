import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';
import { AddDroneWizardStateService } from 'src/app/core/services/add-drone-wizard-state.service';

@Component({
  selector: 'app-create-remote-flow',
  templateUrl: './create-remote-flow.component.html',
  styleUrls: ['./create-remote-flow.component.scss'],
})
export class CreateRemoteFlowComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
    cancelModalVisible = false;
  constructor(private stateService: AddDroneWizardStateService) { }

  ngOnInit() {}

    // ✅ Cancel modal logic
  onCancelClick() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.stateService.clear(); // ✅ clear local storage
    this.cancel.emit();
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

}
