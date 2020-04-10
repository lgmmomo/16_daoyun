import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamSignInPage } from './exam-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: ExamSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamSignInPageRoutingModule {}
