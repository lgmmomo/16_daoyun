import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.page.html',
  styleUrls: ['./edit-information.page.scss'],
})
export class EditInformationPage implements OnInit {
  title: string;
  property: string;
  value: string; // 用于ngModel，从shop对象的相关属性中获取数据
  loginUser: any; // 用于保存从本地存储中获得店铺数据
  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService,
              private router: Router, private statusBar: StatusBar, private toastCtrl: ToastController,
              private alertController: AlertController) {
      activatedRoute.queryParams.subscribe(queryParams => {
          this.property = queryParams.property;
          this.title = queryParams.title;
      });
      // 沉浸式并且悬浮透明
      this.statusBar.overlaysWebView(true);
  }
  ngOnInit() {
  }
  async save() {
      this.loginUser = this.localStorageService.get('login', null);
      this.loginUser[this.property] = this.value;
      this.localStorageService.set('login', this.loginUser);
      let user = this.localStorageService.get('user', null);
      if ( user != null ) {
          for (let u of user) {
              if (u.phone == this.loginUser.phone) {
                  console.log('找到user表对应用户：', u.phone)
                  console.log('该用户对应的 ', this.property ,'为', u[this.property])
                  u[this.property] = this.value;
                  console.log('修改后该用户对应的 ', this.property ,'为', u[this.property])
                  break;
              }
          }
          this.localStorageService.set('user', user);
          console.log('修改成功！')
      }
      this.value = '';
      let alert =await this.alertController.create({
        animated: true,
        header: '',
        message: '修改成功！',
        buttons: ['确定']
      });
      alert.present();
      this.router.navigateByUrl('set-information');
  }
}
