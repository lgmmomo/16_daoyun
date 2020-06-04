import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  version: '';
  name: '小冰';
  id: '1903270xx';
  constructor(private localStorageService: LocalStorageService, private router: Router, private alertController: AlertController,
              private commonService: CommonService) { }
  ionViewWillEnter() {
    let appConfig: any = this.localStorageService.get('App', {
      hasRun: true,
      isLogin: true,
      version: '1.0.0'
    });
    this.version = appConfig.version;
    let userId = this.localStorageService.get('userID', null);
    let identity = this.localStorageService.get('identity', 'student');
    console.log('当前获取的登入ID为', userId);
    this.commonService.getPersonById(userId, identity).then((result: any) => {
      console.log('用户信息', result);
      this.name = result.personnel.Pname;
      this.id = result.personnel.ID;
      this.localStorageService.set('Studentid', result.personnel.Studentid);
    })
  }
  //退出登录
  onLogout() {
    let app = this.localStorageService.get('APP', []);
    app.isLogin = false  //将APP的登录状态设置为false
    this.localStorageService.set('APP', app);
    this.router.navigateByUrl('/login-in');
  }
  //检查升级
  async checkUpdate() {
    // 判断是否为最新版本
    let alert = await this.alertController.create({
      animated:true,
      mode:'ios',
      header: '提示',
      message: '当前为最新版本!',
      buttons: ['确定']
    });
    alert.present();
  }
}
