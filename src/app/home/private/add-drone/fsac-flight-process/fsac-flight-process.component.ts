import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-fsac-flight-process',
  templateUrl: './fsac-flight-process.component.html',
  styleUrls: ['./fsac-flight-process.component.scss'],
})
export class FsacFlightProcessComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  cancelModalVisible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

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
