import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClassPageRoutingModule } from './view-class-routing.module';

import { ViewClassPage } from './view-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClassPageRoutingModule
  ],
  declarations: [ViewClassPage]
})
export class ViewClassPageModule {}
