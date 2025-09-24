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
import { SetupKillSwtichComponent } from './private/add-drone/setup-kill-swtich/setup-kill-swtich.component';
import { SetupFunctionalSwitchComponent } from './private/add-drone/setup-functional-switch/setup-functional-switch.component';
import { LicenseNowLaterComponent } from './private/add-drone/license-now-later/license-now-later.component';
import { LicenseNowComponent } from './private/add-drone/license-now/license-now.component';
import { LicenceFlightSetupComponent } from './private/add-drone/licence-flight-setup/licence-flight-setup.component';
import { CalibrationOverviewComponent } from './private/add-drone/calibration-overview/calibration-overview.component';
import { RCSetupSwitchBComponent } from './private/add-drone/rc-setup-switch-b/rc-setup-switch-b.component';
import { FlightSetupComponent } from './private/add-drone/flight-setup/flight-setup.component';
import { CurrentIndoorEnvironmentComponent } from './private/add-drone/current-indoor-environment/current-indoor-environment.component';
import { NoIndoorEnvironmentComponent } from './private/add-drone/no-indoor-environment/no-indoor-environment.component';
import { IndoorPreFlightProcessComponent } from './private/add-drone/indoor-pre-flight-process/indoor-pre-flight-process.component';
import { FsacFlightProcessComponent } from './private/add-drone/fsac-flight-process/fsac-flight-process.component';
import { MissionManagementComponent } from './private/mission-management/mission-management.component';
import { ViewDroneProfileComponent } from './private/view-drone-profile/view-drone-profile.component';

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
    SetupKillSwtichComponent,
    SetupFunctionalSwitchComponent,
    LicenseNowLaterComponent,
    LicenseNowComponent,
    LicenceFlightSetupComponent,
    CalibrationOverviewComponent,
    RCSetupSwitchBComponent,
    FlightSetupComponent,
    CurrentIndoorEnvironmentComponent,
    NoIndoorEnvironmentComponent,
    IndoorPreFlightProcessComponent,
    FsacFlightProcessComponent,
    MissionManagementComponent,
    ViewDroneProfileComponent
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
