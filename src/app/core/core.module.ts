
// core.module.ts
// Do not modify this file directly for your custom components. Instead, make changes in core.module.contributed.ts
// This file imports arrays from core.module.contributed.ts and uses them in the @NgModule decorator
// This allows the frontend team to add components / directives / pipes / providers to the CoreModule
// without modifying this file directly. This makes it easier to copy over the core module to
// other projects without conflicts.


// Angular and Ionic Imports
import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Import custom components, directives, pipes, providers from core.module.contributed.ts
// Note: Do not add custom logic here as this file is important for the core module to function properly.
import {
  CORE_CONTRIB_DECLARATIONS,
  CORE_CONTRIB_IMPORTS,
  CORE_CONTRIB_EXPORTS,
  CORE_CONTRIB_PROVIDERS,
} from './core.module.contributed';

const BASE_DECLARATIONS: any[] = [
];

const BASE_IMPORTS: any[] = [
  CommonModule,
  FormsModule,
  IonicModule,
  // TranslateModule,
  ReactiveFormsModule,
  MatIconModule,
];

const BASE_EXPORTS: any[] = [
  FormsModule,
  IonicModule,
  // TranslateModule,
  ReactiveFormsModule,
  MatIconModule,
];

const BASE_PROVIDERS: Provider[] = [
];

const DECLARATIONS = [
  ...BASE_DECLARATIONS,
  ...CORE_CONTRIB_DECLARATIONS
];

const IMPORTS = [
  ...BASE_IMPORTS,
  ...CORE_CONTRIB_IMPORTS
];

const EXPORTS = [
  ...BASE_EXPORTS,
  ...CORE_CONTRIB_EXPORTS
];

const PROVIDERS = [
  ...BASE_PROVIDERS,
  ...CORE_CONTRIB_PROVIDERS
];


@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  exports: EXPORTS,
})

export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,

      providers: PROVIDERS,


    };
  }
  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }
}