// home-page-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AddDroneComponent } from './private/add-drone/add-drone.component';
import { MissionManagementComponent } from './private/mission-management/mission-management.component';
import { ViewDroneProfileComponent } from './private/view-drone-profile/view-drone-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'add-drone',
    component:AddDroneComponent
  },
  {
    path:'mission-management',
    component: MissionManagementComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
