import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindClassPage } from './find-class.page';

const routes: Routes = [
  {
    path: '',
    component: FindClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindClassPageRoutingModule {}
