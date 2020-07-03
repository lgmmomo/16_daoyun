import { MenusettingComponent } from './function/menusetting/menusetting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{UserMessageManageComponent} from './function/user-message-manage/user-message-manage.component';
import {CourseMessageManageComponent} from './function/course-message-manage/course-message-manage.component';
import {FunctionComponent} from './function/function.component';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {LoginGuard} from './service/login_guard';
import {OperatorManageComponent} from './function/operator-manage/operator-manage.component';
import {PersonSettingComponent} from './function/person-setting/person-setting.component';
import {RoleManageComponent} from './function/role-manage/role-manage.component';
import {MessageManageComponent} from './function/message-manage/message-manage.component';
import{ShowDictionaryComponent} from './function/dictionary/show-dictionary/show-dictionary.component';
import {TeacherManageComponent} from './function/teacher-manage/teacher-manage.component';
import {IndexComponent} from './function/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'function',
    component: FunctionComponent,
    children: [
      {path: '', component: IndexComponent},
      {path: 'teacher_manage', component: TeacherManageComponent},
        { path: 'use_message_manage', component: UserMessageManageComponent },
        { path: 'course_message_manage', component: CourseMessageManageComponent },
        { path: 'operator_manage', component: OperatorManageComponent },
        { path: 'person_setting', component: PersonSettingComponent },
        { path: 'role_manage', component: RoleManageComponent },
        { path: 'message_manage', component: MessageManageComponent },
        { path: 'direction/show_dictionary', component: ShowDictionaryComponent },
        { path: 'menusetting', component:MenusettingComponent}
    ],
    canActivate: [LoginGuard]
  },
  {
    path: '**',   // 错误路由重定向[写在最后一个]
    redirectTo: 'login',
    pathMatch: 'full'  // 必须要设置
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
