import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamClassPageRoutingModule } from './exam-class-routing.module';

import { ExamClassPage } from './exam-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamClassPageRoutingModule
  ],
  declarations: [ExamClassPage]
})
export class ExamClassPageModule {}
