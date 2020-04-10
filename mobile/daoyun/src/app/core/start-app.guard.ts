import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_KEY } from '../pages/welcome/welcome.page';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, 
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const appConfig: any = this.localStorageService.get(APP_KEY, { //如果没有APP_key的话，会创建一个，并且以默认值替代
      hasRun: false,
      version: '1.0.0',
      isLogin: false
    });
    //当导航到welcome页面的时候启动guard.如果app还没启动过，则返回true启动welcome页面
    //如果启动过，根据情况启动登录页面或者首页,返回false
    if ( appConfig.hasRun === false ) {//如果app还没有启动过
      appConfig.hasRun = true; //将启动标志设置为 “已启动”
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      // const current = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
      // let l = this.localStorageService.get('login', null)
      // console.log('登录用户:', l);
      // const loginTime = l.loginTime.replace(/-/g, '/');
      // const sTime = new Date(current); // 开始时间
      // console.log('当前时间:', sTime);
      // const eTime = new Date(loginTime); // 结束时间
      // console.log('登录时间:', eTime);
      // const differ: any = ((sTime.getTime() - eTime.getTime()) / 1000 / 60 / 60).toFixed(0);  //单位小时
      // console.log('距离上次登录已经', differ, '小时')
      // if ( differ - 120 > 0) {  // 5天 24*5=120
      //   this.router.navigateByUrl('login-in');  // 大于5天重新登入
      // } else {
      //   this.router.navigateByUrl('tabs');
      // }
      this.router.navigateByUrl('tabs');
      return false;
    }
  }
  
}
