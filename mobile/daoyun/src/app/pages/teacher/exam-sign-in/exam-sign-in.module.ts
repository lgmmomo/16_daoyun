import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamSignInPageRoutingModule } from './exam-sign-in-routing.module';

import { ExamSignInPage } from './exam-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamSignInPageRoutingModule
  ],
  declarations: [ExamSignInPage]
})
export class ExamSignInPageModule {}
