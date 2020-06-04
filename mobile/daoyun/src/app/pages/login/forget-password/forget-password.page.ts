import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, MenuController } from '@ionic/angular';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  @ViewChild('forgotPasswordSlides', { static: true }) forgotPasswordSlides: IonSlides;
  user = {
    pwd: '',
    cpwd: ''
  };
  pwdIsSame = true;
  constructor(private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    private commonService: CommonService,
    private localStorageService: LocalStorageService) { }
  ngOnInit() {
  }
  /**
   *修改密码
   * @memberof ForgotPasswordPage
   */
  async onSendPwd() {
    if (this.user.pwd === this.user.cpwd) {
      let userID = this.localStorageService.get('userID', null);
      let identity = this.localStorageService.get('identity', 'student');
      // 注册成功，保存数据
      let updata = {
        'password': Md5.hashStr(this.user.pwd).toString(),
        'loginname': userID
      }
      this.commonService.change_password(updata, identity).then(async (result: any) => {
        if (result.status = "success") {
          let alert = await this.alertController.create({
            mode:'ios',
            animated: true,
            header: '提示',
            message: '密码修改成功！',
            buttons: ['确定']
          });
          alert.present();
          this.router.navigateByUrl('/login-in');
        }
      }).catch(async (error) => {
        console.log('修改密码失败', error);
        let alert = await this.alertController.create({
          mode:'ios',
          animated: true,
          header: '提示',
          message: '密码修改失败！',
          buttons: ['确定']
        });
        alert.present();
      })
    } else {//密码输入不一致
      this.pwdIsSame = false;
    }
  }

}
