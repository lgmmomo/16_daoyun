import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';
import { APP_KEY } from '../../welcome/welcome.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  version = '';
  name = '';
  id = '';
  isDarkMode = true;
  constructor(private localStorageService: LocalStorageService,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService) {
    let theme = this.localStorageService.get('data-theme', 'dark');
    document.body.setAttribute('data-theme', theme);
    if (theme == 'light') {
      this.isDarkMode = false;
    }
    let appConfig: any = this.localStorageService.get(APP_KEY, null);
    this.version = appConfig.version;
    let userId = this.localStorageService.get('userID', null);
    let identity = this.localStorageService.get('identity', 'student');
    console.log('当前获取的登入ID为', userId);
    this.getData(userId, identity);
  }
  getData(userId, identity) {
    this.commonService.getPersonById(userId, identity).then((result: any) => {
      console.log('用户信息', result);
      this.name = result.personnel.Pname;
      this.id = result.personnel.ID;
      this.localStorageService.set('Studentid', result.personnel.Studentid);
      this.localStorageService.set('userName', result.personnel.Pname);
    })
  }
  //下拉刷新
  refreshData(event) {
    let userId = this.localStorageService.get('userID', null);
    let identity = this.localStorageService.get('identity', 'student');
    this.getData(userId, identity);
    let theme = this.localStorageService.get('data-theme', 'dark');
    if (theme == 'light') {
      this.isDarkMode = false;
    }
    else {
      this.isDarkMode = true;
    }
    event.target.complete();
  }
  openSetInformation() {
    this.router.navigateByUrl('/set-information');
  }
  openAboutUs() {
    this.router.navigateByUrl('/about-us');
  }
  //退出登录
  async onLogout() {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: '确认退出？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '退出',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Delete');
            let app = this.localStorageService.get(APP_KEY, []);
            app.isLogin = false  //将APP的登录状态设置为false
            this.localStorageService.set(APP_KEY, app);
            this.localStorageService.remove('userID');
            this.localStorageService.remove('userName');
            this.localStorageService.remove('identity');
            this.router.navigateByUrl('/login-in');
          }
        }
      ]
    });
    await alert.present();
  }
  //检查升级
  async checkUpdate() {
    // 判断是否为最新版本
    let alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: '当前为最新版本!',
      buttons: ['确定']
    });
    alert.present();
  }
  //改变模式
  onChangeScheme(event) {
    console.log('改变主题颜色');
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      this.localStorageService.set('data-theme', 'dark');
    }
    else {
      document.body.setAttribute('data-theme', 'light');
      this.localStorageService.set('data-theme', 'light');
    }
  }
  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
      this.localStorageService.set('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.localStorageService.set('data-theme', 'light');
    }
  }

  // 点击忘记密码时调用
  openForgotPassword() {
    // 进入找回密码页面
    this.router.navigate(['/forget-password'], {
      queryParams: {
        page: 0
      }
    })
  }

}
