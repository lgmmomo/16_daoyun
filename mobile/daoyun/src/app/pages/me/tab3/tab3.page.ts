import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  version: '';
  name: '小冰';
  id: '1903270xx';
  constructor(private localStorageService: LocalStorageService, private router: Router, private alertController: AlertController) { }
  ionViewWillEnter() {
      let appConfig: any = this.localStorageService.get('App', {
          hasRun: false,
          version: '1.0.0'
      });
      this.version = appConfig.version;
      let loginUser = this.localStorageService.get('login', []);
      this.name = loginUser.name;
      this.id = loginUser.userNo;
  }
  //退出登录
  onLogout() {
    this.localStorageService.remove('login');
    let app = this.localStorageService.get('APP', []);
    app.isLogin = false  //将APP的登录状态设置为false
    this.localStorageService.set('APP', app);
    this.router.navigateByUrl('login-in');
  }
  //检查升级
  async checkUpdate() {
    // 判断是否为最新版本
      let alert =await this.alertController.create({
          header: '提示',
          message: '当前为最新版本',
          buttons: ['确定']
      });
      alert.present();
  }
}
