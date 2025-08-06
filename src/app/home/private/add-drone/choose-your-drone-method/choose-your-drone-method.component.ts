import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-choose-your-drone-method',
  templateUrl: './choose-your-drone-method.component.html',
  styleUrls: ['./choose-your-drone-method.component.scss'],
})
export class ChooseYourDroneMethodComponent implements OnInit {
  @Output() next = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();
  @Input() steps: Step[] = [];
  @Input() currentStepIndex!: number;
  cancelModalVisible = false;
  selected: string = '';
  selectedMethod:any | null = null;

selectMethod(method: string) {
  this.selected = method;
  this.selectedMethod = method; // 👈 This was missing
}





  showCancelModal() {
    this.cancelModalVisible = true;
  }

  openCancelModal() {
    this.cancelModalVisible = true;
  }

  onCancelConfirmed() {
    this.cancelModalVisible = false;
    // Navigate back or reset
    console.log('Canceled setup');
  }
  constructor() {}

  ngOnInit() {}
}
