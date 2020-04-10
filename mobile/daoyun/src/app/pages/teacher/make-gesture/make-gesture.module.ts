import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeGesturePageRoutingModule } from './make-gesture-routing.module';

import { MakeGesturePage } from './make-gesture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeGesturePageRoutingModule
  ],
  declarations: [MakeGesturePage]
})
export class MakeGesturePageModule {}
