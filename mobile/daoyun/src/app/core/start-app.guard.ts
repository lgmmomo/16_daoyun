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

    const appConfig: any = this.localStorageService.get(APP_KEY, {
      hasRun: false,
      version: '1.0.0',
      isLogin: false
    });

    if (appConfig.hasRun == false) {//如果app还没有启动过
      return true; //启动路由守护的页面（welcome）
    }
    else {
      if (appConfig.isLogin == true) {
        this.router.navigateByUrl('/tabs/tabs/tab3');
      }
      else {
        this.router.navigateByUrl('/login-in');
      }
      return false; //不启动路由守护的页面（welcome）
    }
  }

}
