import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamClassPage } from './exam-class.page';

const routes: Routes = [
  {
    path: '',
    component: ExamClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamClassPageRoutingModule {}
