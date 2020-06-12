import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartAppGuard } from './core/start-app.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [StartAppGuard] 
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/login/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login-in',
    loadChildren: () => import('./pages/login/login-in/login-in.module').then( m => m.LoginInPageModule)
  },
  {
    path: 'new-class',
    loadChildren: () => import('./pages/teacher/new-class/new-class.module').then( m => m.NewClassPageModule)
  },
  {
    path: 'exam-class',
    loadChildren: () => import('./pages/teacher/exam-class/exam-class.module').then( m => m.ExamClassPageModule)
  },
  {
    path: 'exam-sign-in',
    loadChildren: () => import('./pages/teacher/exam-sign-in/exam-sign-in.module').then( m => m.ExamSignInPageModule)
  },
  {
    path: 'make-gesture',
    loadChildren: () => import('./pages/teacher/make-gesture/make-gesture.module').then( m => m.MakeGesturePageModule)
  },
  {
    path: 'view-class',
    loadChildren: () => import('./pages/student/view-class/view-class.module').then( m => m.ViewClassPageModule)
  },
  {
    path: 'gesture-sign-in',
    loadChildren: () => import('./pages/student/gesture-sign-in/gesture-sign-in.module').then( m => m.GestureSignInPageModule)
  },
  {
    path: 'set-information',
    loadChildren: () => import('./pages/me/set-information/set-information.module').then( m => m.SetInformationPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/login/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/me/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'class-info',
    loadChildren: () => import('./pages/teacher/class-info/class-info.module').then( m => m.ClassInfoPageModule)
  },
  {
    path: 'stu-class-info',
    loadChildren: () => import('./pages/student/stu-class-info/stu-class-info.module').then( m => m.StuClassInfoPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/teacher/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
