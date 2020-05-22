import { async } from '@angular/core/testing';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Component({
    selector: 'app-login-in',
    templateUrl: './login-in.page.html',
    styleUrls: ['./login-in.page.scss'],
})
export class LoginInPage implements OnInit {
    username: string; // 视图模型的属性账号，双向绑定
    password: string; // 视图模型的属性密码，双向绑定
    isPass = '';
    constructor(private toastController: ToastController, private alertController: AlertController,
        private router: Router, private userService: UserService, private menuController: MenuController,
        private commonService: CommonService, private localStorageService: LocalStorageService) { }
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
        if (this.username == undefined || this.password == undefined || this.username == '' || this.password == '') {
            const alert = await this.alertController.create({
                message: '账号或密码不能为空!',
                mode: 'ios',
                animated: true,
                buttons: ['OK']
            });
            await alert.present();
        }
        else {//有输入
            this.commonService.postLogin(this.username, this.password).then(async (result: any) => {
                console.log('返回的登入信息:', result);
                this.isPass = result.state;
                if (this.isPass == '1') {
                    //将登录信息存在本地数据库
                    this.localStorageService.set('userID', this.username);
                    let app = this.localStorageService.get('APP', []);
                    app.isLogin = true;
                    app.version = '1.0.0';
                    app.hasRun = true;
                    // app.identity = loginUser.identity
                    this.localStorageService.set('APP', app);
                    let toast = await this.toastController.create({
                        message: '登录成功',
                        duration: 1000,
                        position: 'bottom',
                      });
                    toast.present();
                    this.router.navigateByUrl('/tabs/tabs/tab3');
                }
                else if (this.isPass == '0') {
                    const alert = await this.alertController.create({
                        message: '学号不存在！',
                        mode: 'ios',
                        animated: true,
                        buttons: ['OK']
                    });
                    await alert.present();
                  }
                  else {
                    const alert = await this.alertController.create({
                        message: '密码错误！',
                        mode: 'ios',
                        animated: true,
                        buttons: ['OK']
                    });
                    await alert.present();
                  }
            }).catch((error)=>{
                console.log('postLogin出现错误:',error);
            })
        }
    }
    // 点击忘记密码时调用
    openForgotPassword() {
        // 进入找回密码页面
        this.router.navigateByUrl('forgot-password');
    }
}
