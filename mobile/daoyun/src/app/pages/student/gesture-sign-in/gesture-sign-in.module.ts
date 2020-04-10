import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestureSignInPageRoutingModule } from './gesture-sign-in-routing.module';

import { GestureSignInPage } from './gesture-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestureSignInPageRoutingModule
  ],
  declarations: [GestureSignInPage]
})
export class GestureSignInPageModule {}
