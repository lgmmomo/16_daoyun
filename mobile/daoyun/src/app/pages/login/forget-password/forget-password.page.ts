import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, MenuController } from '@ionic/angular';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  @ViewChild('forgotPasswordSlides', { static: true }) forgotPasswordSlides: IonSlides;
  user = {
    forgotPhone: '',
    pwd: '',
    cpwd: ''
  };
  pwdIsSame = true;
  constructor(private router: Router,
              private userService: UserService,
              private alertController: AlertController) { }
  ngOnInit() {
  }
  /**
   *修改密码
   * @memberof ForgotPasswordPage
   */
  async onSendPwd() {
    if (this.user.pwd === this.user.cpwd) {
        // 注册成功，保存数据
        if (this.userService.update(this.user.forgotPhone, this.user.pwd)) {
            let alert =await this.alertController.create({
                header: '提示',
                message: '密码修改成功！',
                buttons: ['确定']
            });
            alert.present();
            this.router.navigateByUrl('login-in');
        }
        else{
          console.log('修改失败，手机号无效或者网路连接失败!')
        }
    } else {
        this.pwdIsSame = false;
    }
  }
 
}
