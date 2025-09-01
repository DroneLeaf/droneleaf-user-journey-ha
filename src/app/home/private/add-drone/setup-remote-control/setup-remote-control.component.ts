import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

type RemoteControlOption = 'new_remote' | 'existing_remote';

@Component({
  selector: 'app-setup-remote-control',
  templateUrl: './setup-remote-control.component.html',
  styleUrls: ['./setup-remote-control.component.scss'],
})
export class SetupRemoteControlComponent implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: number;
  @Output() next = new EventEmitter<RemoteControlOption>();
  @Output() back = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cancelModalVisible = false;
  selectedOption: RemoteControlOption | null = null;
  selectedDroneOption: RemoteControlOption | null = null;

  constructor(private router: Router) {}

  ngOnInit() {}

  // -------- Cancel Flow --------
  showCancelModal() {
    this.cancelModalVisible = true;
  }

  cancelConfirmed() {
    this.cancelModalVisible = false;
    this.router.navigate(['/dashboard']);
  }

  cancelDismissed() {
    this.cancelModalVisible = false;
  }

  onCancelClick() {
    this.cancel.emit();
  }

  // -------- Option Selection --------
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
