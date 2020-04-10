import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetInformationPage } from './set-information.page';

const routes: Routes = [
  {
    path: '',
    component: SetInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetInformationPageRoutingModule {}
