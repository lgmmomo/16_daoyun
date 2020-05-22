import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrtestPageRoutingModule } from './qrtest-routing.module';

import { QrtestPage } from './qrtest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrtestPageRoutingModule
  ],
  declarations: [QrtestPage]
})
export class QrtestPageModule {}
