import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QriousTestPageRoutingModule } from './qrious-test-routing.module';

import { QriousTestPage } from './qrious-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QriousTestPageRoutingModule
  ],
  declarations: [QriousTestPage]
})
export class QriousTestPageModule {}
