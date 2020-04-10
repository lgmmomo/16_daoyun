import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestureSignInPage } from './gesture-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: GestureSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestureSignInPageRoutingModule {}
