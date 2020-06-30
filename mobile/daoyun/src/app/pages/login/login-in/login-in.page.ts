import { async } from '@angular/core/testing';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { APP_KEY } from '../../welcome/welcome.page';

@Component({
    selector: 'app-login-in',
    templateUrl: './login-in.page.html',
    styleUrls: ['./login-in.page.scss'],
})
export class LoginInPage implements OnInit {
    username: string; // 视图模型的属性账号，双向绑定
    password: string; // 视图模型的属性密码，双向绑定
    identity = 'teacher'; //登录身份
    isPass = '';
    constructor(private toastController: ToastController,
        private alertController: AlertController,
        private router: Router,
        private commonService: CommonService,
        private localStorageService: LocalStorageService) {
        let theme = this.localStorageService.get('data-theme', 'dark');
        document.body.setAttribute('data-theme', theme);
    }
    ngOnInit() {
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
            let flag=1;//1是用户名 2的时候用手机号登录
            // console.log('账号的首字母',this.username[0])
            if(this.username.length==11&&this.username[0]=='1'){             
                flag=2;//登录账号为手机号   
            }
            this.commonService.postLogin(flag, this.username, this.password, this.identity).then(async (result: any) => {
                // console.log('返回的登入信息:', result);
                this.isPass = result.state;
                if (this.isPass == '1') {
                    //将登录信息存在本地数据库
                    this.localStorageService.set('flag', flag);
                    this.localStorageService.set('loginname', this.username);
                    this.localStorageService.set('identity', this.identity);
                    let app = this.localStorageService.get(APP_KEY, []);
                    app.isLogin = true;
                    // console.log('app', app);
                    // app.identity = loginUser.identity
                    this.localStorageService.set(APP_KEY, app);
                    let toast = await this.toastController.create({
                        animated: true,
                        mode: 'ios',
                        message: '登录成功',
                        duration: 1000,
                        position: 'bottom'
                    });
                    toast.present();
                    this.router.navigateByUrl('/tabs/tabs/tab3');
                }
                else if (this.isPass == '0') {
                    const alert = await this.alertController.create({
                        message: '登录账号不存在！',
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
            }).catch(async (error) => {
                // console.log('postLogin出现错误:', error);
            })
        }
    }
    // 点击忘记密码时调用
    openForgotPassword() {
        // 进入找回密码页面
        this.router.navigate(['/forget-password'], {
            queryParams: {
                page: 1
            }
        })
    }
    openSignUp(){
        this.router.navigateByUrl('/sign-up');
    }
}
