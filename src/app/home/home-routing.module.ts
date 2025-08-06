// home-page-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AddDroneComponent } from './private/add-drone/add-drone.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'add-drone',
    component:AddDroneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
