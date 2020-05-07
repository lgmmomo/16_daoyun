import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QriousTestPage } from './qrious-test.page';

const routes: Routes = [
  {
    path: '',
    component: QriousTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QriousTestPageRoutingModule {}
