import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassInfoPageRoutingModule } from './class-info-routing.module';

import { ClassInfoPage } from './class-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassInfoPageRoutingModule
  ],
  declarations: [ClassInfoPage]
})
export class ClassInfoPageModule {}
