import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './home/private/dashboard/dashboard.component';
import { DroneLibraryComponent } from './home/private/drone-library/drone-library.component';
import { BusinessDashboardComponent } from './home/business/business-dashboard/business-dashboard.component';
import { AddDroneComponent } from './home/private/add-drone/add-drone.component';
import { DroneLinraryComponent } from './home/business/drone-linrary/drone-linrary.component';
import { MissionManagementComponent } from './home/private/mission-management/mission-management.component';
import { ViewDroneProfileComponent } from './home/private/view-drone-profile/view-drone-profile.component';

const routes: Routes = [
  // ✅ Auth & Registration Routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'drone-library',
        component: DroneLibraryComponent,
      },
      {
        path: 'business-dashboard',
        component: BusinessDashboardComponent,
      },
      {
        path:'business-drone-library',
        component:DroneLinraryComponent
      },
      {
        path:'mission-management',
        component:MissionManagementComponent
      },
      {
        path:'view-drone-profile',
        component:ViewDroneProfileComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'add-drone',
    component: AddDroneComponent,
  },
  {
    path: '',
    redirectTo: 'auth/account-type',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
