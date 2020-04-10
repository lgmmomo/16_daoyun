import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClassPage } from './new-class.page';

const routes: Routes = [
  {
    path: '',
    component: NewClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClassPageRoutingModule {}
