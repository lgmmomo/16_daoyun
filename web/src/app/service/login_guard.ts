import { CanActivate } from "@angular/router";
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
@Injectable()
export class LoginGuard implements CanActivate{
    constructor(
        public router: Router
      ) { }
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>| boolean{

        if(sessionStorage.getItem('login_status')){
            // console.log("已登录");
            return true;
        }
        this.router.navigate(['login']);;
        console.log("未登录");
        return false;
    
    }
}