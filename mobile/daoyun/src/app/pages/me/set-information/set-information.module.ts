import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetInformationPageRoutingModule } from './set-information-routing.module';

import { SetInformationPage } from './set-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetInformationPageRoutingModule
  ],
  declarations: [SetInformationPage]
})
export class SetInformationPageModule {}
