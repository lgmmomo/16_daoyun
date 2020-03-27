import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientJsonpModule,HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { FunctionComponent } from './function/function.component';
import { UserMessageManageComponent } from './function/user-message-manage/user-message-manage.component';
import { CourseMessageManageComponent } from './function/course-message-manage/course-message-manage.component';
import {LoginGuard} from './service/login_guard';
import { MessageManageComponent } from './function/message-manage/message-manage.component';
import { RoleManageComponent } from './function/role-manage/role-manage.component';
import { OperatorManageComponent } from './function/operator-manage/operator-manage.component';
import { PersonSettingComponent } from './function/person-setting/person-setting.component';

import { ShowDictionaryComponent } from './function/dictionary/show-dictionary/show-dictionary.component';
import { TeacherManageComponent } from './function/teacher-manage/teacher-manage.component';
import { IndexComponent } from './function/index/index.component';
import { Error404Component } from './error/error404/error404.component';
import { Error403Component } from './error/error403/error403.component';
import { Error500Component } from './error/error500/error500.component';
import { ErrorCustomComponent } from './error/error-custom/error-custom.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FunctionComponent,
    UserMessageManageComponent,
    CourseMessageManageComponent,
    MessageManageComponent,
    RoleManageComponent,
    OperatorManageComponent,
    PersonSettingComponent,
    ShowDictionaryComponent,
    TeacherManageComponent,
    IndexComponent,
    Error404Component,
    Error403Component,
    Error500Component,
    ErrorCustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
