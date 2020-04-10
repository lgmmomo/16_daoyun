import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.page.html',
  styleUrls: ['./login-in.page.scss'],
})
export class LoginInPage implements OnInit {
  username: string; // 视图模型的属性账号，双向绑定
  password: string; // 视图模型的属性密码，双向绑定
  constructor(private toastController: ToastController, private alertController: AlertController,
              private router: Router, private userService: UserService, private menuController: MenuController) { }
  ngOnInit() {
  }
  ionViewDidEnter() {
      this.menuController.enable(false);
  }
  ionViewDidLeave() {
      this.menuController.enable(true);
  }
  // 点击登录按钮时调用
  async onLogin(form: NgForm) {
      if ( this.username == undefined || this.password == undefined || this.username == '' || this.password == '' ) {
          let toast = await this.toastController.create({
              message: '请输入您的手机号码或者邮箱',
              duration: 3000
          });
          toast.present();
      } 
      else {
          if (!this.userService.login(this.username, this.password)) {
              let alert =await this.alertController.create({
                  header: '提示',
                  message: '用户名或者密码不正确',
                  buttons: ['确定']
              });
              alert.present();
          } 
          else {
              this.router.navigateByUrl('student');
          }
      }
  }
  // 点击忘记密码时调用
  openForgotPassword() {
      // 进入找回密码页面
      this.router.navigateByUrl('forgot-password');
  }
}
