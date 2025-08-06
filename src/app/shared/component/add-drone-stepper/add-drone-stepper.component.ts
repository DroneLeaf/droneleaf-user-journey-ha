import { Component, Input, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-add-drone-stepper',
  templateUrl: './add-drone-stepper.component.html',
  styleUrls: ['./add-drone-stepper.component.scss'],
})
export class AddDroneStepperComponent  implements OnInit {
  @Input() steps: Step[] = [];
  @Input() currentStepIndex = 0;
  constructor() { }

  ngOnInit() {}

}
