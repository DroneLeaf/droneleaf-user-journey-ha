import { Component, Input, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/add-drone-stepper.model';

@Component({
  selector: 'app-organization-drone-setup',
  templateUrl: './organization-drone-setup.component.html',
  styleUrls: ['./organization-drone-setup.component.scss'],
})
export class OrganizationDroneSetupComponent  implements OnInit {
  @Input() steps!: Step[];
  @Input() currentStepIndex!: any;
  constructor() { }

  ngOnInit() {}

}
