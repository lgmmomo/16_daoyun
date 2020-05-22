import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StuClassInfoPage } from './stu-class-info.page';

const routes: Routes = [
  {
    path: '',
    component: StuClassInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuClassInfoPageRoutingModule {}
