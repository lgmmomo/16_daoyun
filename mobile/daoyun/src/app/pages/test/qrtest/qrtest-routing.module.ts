import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrtestPage } from './qrtest.page';

const routes: Routes = [
  {
    path: '',
    component: QrtestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrtestPageRoutingModule {}
