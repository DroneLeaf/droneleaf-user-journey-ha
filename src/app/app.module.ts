import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { HomePageModule } from './home/home.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent,LayoutComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AuthModule,HttpClientModule,SharedModule,HomePageModule,CoreModule, NgCircleProgressModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
