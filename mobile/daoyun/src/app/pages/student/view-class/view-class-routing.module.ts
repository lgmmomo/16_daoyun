import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClassPage } from './view-class.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClassPageRoutingModule {}
