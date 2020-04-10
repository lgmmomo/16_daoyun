import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeGesturePage } from './make-gesture.page';

const routes: Routes = [
  {
    path: '',
    component: MakeGesturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeGesturePageRoutingModule {}
