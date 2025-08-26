import { DroneMoterTestComponent } from './private/add-drone/drone-moter-test/drone-moter-test.component';
import { ExistingAndNewTemplateStepComponent } from './private/add-drone/existing-and-new-template-step/existing-and-new-template-step.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { DroneLibraryComponent } from './private/drone-library/drone-library.component';
import { AddDroneComponent } from './private/add-drone/add-drone.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { StepOneComponent } from './private/add-drone/step-one/step-one.component';
import { StepTwoComponent } from './private/add-drone/step-two/step-two.component';
import { StepThreeComponent } from './private/add-drone/step-three/step-three.component';
import { StepFourComponent } from './private/add-drone/step-four/step-four.component';
import { SelectDroneStepComponent } from './private/add-drone/select-drone-step/select-drone-step.component';
import { CustomeDroneComponent } from './private/add-drone/custome-drone/custome-drone.component';
import { ChooseYourDroneMethodComponent } from './private/add-drone/choose-your-drone-method/choose-your-drone-method.component';
import { TierOneScreenComponent } from './private/add-drone/tier-one-screen/tier-one-screen.component';
import { BusinessDashboardComponent } from './business/business-dashboard/business-dashboard.component';
import { DroneLinraryComponent } from './business/drone-linrary/drone-linrary.component';
import { CreateNewTemplateStepComponent } from './private/add-drone/create-new-template-step/create-new-template-step.component';
import { CreateNewTemplateFormStepComponent } from './private/add-drone/create-new-template-form-step/create-new-template-form-step.component';
import { OutComponentSetupComponent } from './private/add-drone/out-component-setup/out-component-setup.component';
import { OrganizationDroneSetupComponent } from './private/add-drone/organization-drone-setup/organization-drone-setup.component';
import { SetupRemoteControlComponent } from './private/add-drone/setup-remote-control/setup-remote-control.component';
import { CreateRemoteFlowComponent } from './private/add-drone/create-remote-flow/create-remote-flow.component';
import { TestRemoteControlComponent } from './private/add-drone/test-remote-control/test-remote-control.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatButtonModule,
    HomePageRoutingModule,
    SharedModule,
    MatIconModule,
    CoreModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      responsive: true,
      showTitle: false,
      showUnits: false,
      showSubtitle: false,
      startFromZero: false,
    }),
  ],
  declarations: [
    HomePage,
    DashboardComponent,
    DroneLibraryComponent,
    AddDroneComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    SelectDroneStepComponent,
    CustomeDroneComponent,
    ChooseYourDroneMethodComponent,
    TierOneScreenComponent,
    BusinessDashboardComponent,
    DroneLinraryComponent,
    ExistingAndNewTemplateStepComponent,
    CreateNewTemplateStepComponent,
    CreateNewTemplateFormStepComponent,
    DroneMoterTestComponent,
    OutComponentSetupComponent,
    OrganizationDroneSetupComponent,
    SetupRemoteControlComponent,
    CreateRemoteFlowComponent,
    TestRemoteControlComponent,
  ],
  exports: [
    AddDroneComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    SelectDroneStepComponent,
    CustomeDroneComponent,
    ChooseYourDroneMethodComponent,
    TierOneScreenComponent,
    ExistingAndNewTemplateStepComponent,
  ],
})
export class HomePageModule {}
