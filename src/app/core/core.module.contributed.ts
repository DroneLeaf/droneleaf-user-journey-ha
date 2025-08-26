/* core.module.contributed.ts
- This file is for the frontend team to add any components / directives / pipes / providers
that they want to be included in the CoreModule without modifying core.module.ts directly.
- The idea is to have a modular approach where the core module can be extended easily.
- This makes it much easier to copy over the core module to other projects without conflicts.
Note: This file is imported by core.module.ts */

// How to use:
// 1. Add your components / directives / pipes to the CORE_CONTRIB_DECLARATIONS array
// 2. Add any Angular or 3rd party modules that your components need to the CORE_CONTRIB_IMPORTS array
// 3. Add any components / directives / pipes that you want to be exported by CoreModule to the CORE_CONTRIB_EXPORTS array
// 4. Add any providers to the CORE_CONTRIB_PROVIDERS array
// Then, in core.module.ts, import these arrays and use them in the @NgModule decorator as you wish.

// Do not add custom logic here as this file is important for the core module to function properly.

import { Provider, Type } from '@angular/core';

// Frontend V2 Components
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from "./components/inputs/text-input/text-input.component";
import { SelectInputComponent } from './components/select-input/select-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { ToastComponent } from './components/toast/toast.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { ConfirmCancelModelComponent } from './components/confirm-cancel-model/confirm-cancel-model.component';

// Components / directives / pipes to be declared by CoreModule
export const CORE_CONTRIB_DECLARATIONS: Type<any>[] = [
    // Frontend V2 components
    InputComponent, ButtonComponent, TextInputComponent, SelectInputComponent, PhoneInputComponent, ToastComponent, HelpButtonComponent, ConfirmCancelModelComponent
];

// Angular/3P modules to import into CoreModule
export const CORE_CONTRIB_IMPORTS: any[] = [
];

// What CoreModule should re-export
export const CORE_CONTRIB_EXPORTS: any[] = [
    // Frontend V2 components
    InputComponent,
    ButtonComponent,
    TextInputComponent,
    SelectInputComponent,
    PhoneInputComponent,
    ToastComponent,
    HelpButtonComponent,
    ConfirmCancelModelComponent
];

// Any providers to register in CoreModule
export const CORE_CONTRIB_PROVIDERS: Provider[] = [
    // Example: { provide: SOME_TOKEN, useValue: ... },
];
