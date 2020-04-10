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
    code: '',
    pwd: '',
    cpwd: ''
  };
  codeIsRight = true;
  pwdIsSame = true;
  constructor(private authenticationCodeService: AuthenticationCodeService, private router: Router,
              private userService: UserService,
              private alertController: AlertController, private menuController: MenuController) { }
  ngOnInit() {
      this.forgotPasswordSlides.lockSwipeToNext(true);
  }
  ionViewDidEnter() {
      this.menuController.enable(false);
  }
  ionViewDidLeave() {
      this.menuController.enable(true)
  }
  next() {
      this.forgotPasswordSlides.lockSwipeToNext(false);
      this.forgotPasswordSlides.slideNext();
      this.forgotPasswordSlides.lockSwipeToNext(true);
  }
  previous() {
      this.forgotPasswordSlides.lockSwipeToNext(false);
      this.forgotPasswordSlides.slidePrev();
      this.forgotPasswordSlides.lockSwipeToNext(true);
  }
  onSendCode() {
    if (this.authenticationCodeService.validate(this.user.code)) {
      this.next();
    } else {
      // 验证码错误
        this.codeIsRight = false;
    }
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
    } else {
        this.pwdIsSame = false;
    }
  }
  async onSendPhone() {
    if (this.userService.check(this.user.forgotPhone)) {
        let newcode = this.authenticationCodeService.createCode(4);//发送4位验证码
        let alert =await this.alertController.create({
          header: '短信验证码',
          message: newcode,
          buttons: ['确定']
        });
        alert.present();
        this.next();
    } else {
        let alert =await this.alertController.create({
          header: '警告',
          message: '当前手机号未注册！',
          buttons: ['确定']
        });
        alert.present();
    }
  }

}
