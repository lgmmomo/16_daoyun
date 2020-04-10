import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClassPageRoutingModule } from './new-class-routing.module';

import { NewClassPage } from './new-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewClassPageRoutingModule
  ],
  declarations: [NewClassPage]
})
export class NewClassPageModule {}
