import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, MenuController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
  backPage=1;//默认上一级为登录页面
  pwdIsSame = true;
  username_login='';
  identity_login = 'teacher'; //登录身份
  constructor(private router: Router,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private commonService: CommonService,
    private localStorageService: LocalStorageService) {
    let theme = this.localStorageService.get('data-theme', 'dark');
    document.body.setAttribute('data-theme', theme);
    this.activatedRoute.queryParams.subscribe((result:any) => {
      // console.log('传入的参数：', result);
      this.backPage=Number(result.page);
    })
  }
  ngOnInit() {
  }
  /**
   *修改密码
   * @memberof ForgotPasswordPage
   */
  async onSendPwd() {
    let identity = '';
    let loginname='';
    if (this.user.pwd == this.user.cpwd) {
      if(this.backPage==1){//上一级是登录页面
        if(this.username_login==''){
          this.presentAlert('账号不能为空！');
          return;
        }
        identity = this.identity_login;
        loginname = this.username_login;
      }
      else{//如果是tab3跳来的，说明本地已经有储存用户名和身份了
        loginname = this.localStorageService.get('userloginname', null);
        identity = this.localStorageService.get('identity', 'student');
      }
      let updata = {
        'password': Md5.hashStr(this.user.pwd).toString(),
        'loginname': loginname
      }
      this.commonService.change_password(updata, identity).then(async (result: any) => {
        if (result.status = "success") {
          this.presentAlert('密码修改成功！');
          this.router.navigateByUrl('/login-in');
        }
      }).catch(async (error) => {
        // console.log('修改密码失败,没有此用户名', error);
        this.presentAlert('密码修改失败，没有此用户名！');
      })
    } else {//密码输入不一致
      this.pwdIsSame = false;
    }
  }

  onBack(){
    if(this.backPage==1){
      this.router.navigateByUrl('/login-in');
    }
    else{
      this.router.navigateByUrl('/tabs/tabs/tab3');
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }


}
