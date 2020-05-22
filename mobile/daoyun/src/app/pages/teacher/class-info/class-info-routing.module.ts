import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassInfoPage } from './class-info.page';

const routes: Routes = [
  {
    path: '',
    component: ClassInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassInfoPageRoutingModule {}
