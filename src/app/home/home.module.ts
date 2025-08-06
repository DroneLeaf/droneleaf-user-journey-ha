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
    TierOneScreenComponent
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
    TierOneScreenComponent
  ],
})
export class HomePageModule {}
