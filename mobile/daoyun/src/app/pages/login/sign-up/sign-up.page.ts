import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private alertController: AlertController,
    private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    let theme = this.localStorageService.get('data-theme', 'dark');
    document.body.setAttribute('data-theme', theme);
  }

  passwdCheck = true //密码和验证密码是否一致

  signup = {
    name: '',//真实姓名
    school: '',//学校
    username: '', //用户名
    tel: '', //手机号
    major: '',//专业
    class: '', //班级(先手动输入，后面有需求再改成下拉框)
    identity: 'student',//学生、老师
    userNo: null, //学号、工号
    password: '',
    confirmPassword: '',
  }

  isStudent = 1;

  ngOnInit() {
  }

  onChangeIdentity(e) {
    if (this.signup.identity == 'teacher') {
      this.isStudent = 0;
    }
    else {
      this.isStudent = 1;
    }
  }
  onSubmit() {
    // console.log(this.signup)
    if (this.signup.name == '') {
      this.presentAlert('姓名不能为空!');
    }
    else if (this.signup.username == '') {
      this.presentAlert('用户名不能为空!');
    }
    else if (this.signup.tel == '') {
      this.presentAlert('手机号不能为空!');
    }
    else if (String(this.signup.tel).length != 11) {
      // console.log(this.signup.tel.length)
      this.presentAlert('手机号格式不正确!');
    }
    else if (this.signup.userNo == '') {
      this.presentAlert('学号不能为空!');
    }
    else if (this.signup.userNo >= 2047483647) {
      this.presentAlert('学号或工号不能超过九位!');
    }
    else if (this.signup.password == '') {
      this.presentAlert('密码不能为空!');
    }
    else if (this.signup.confirmPassword == '') {
      this.presentAlert('确认密码不能为空!');
    }
    else if (this.signup.confirmPassword != this.signup.password) {
      this.presentAlert('两次输入的密码不相同!');
    }
    else { //必填信息都填了，而且没有错
      let userInfo: any = {}
      if (this.signup.identity == 'student') {
        userInfo['username'] = this.signup.username
        userInfo['tel'] = String(this.signup.tel)
        userInfo['studentname'] = this.signup.name
        userInfo['schooling'] = this.signup.school
        userInfo['major'] = this.signup.major
        userInfo['studentclass'] = this.signup.class
        userInfo['roleid'] = '3'
        userInfo['studentnumber'] = String(this.signup.userNo)
        userInfo['password'] = Md5.hashStr(this.signup.password).toString()
      }
      else { //老师
        userInfo['username'] = this.signup.username
        userInfo['tel'] = String(this.signup.tel)
        userInfo['teachername'] = this.signup.name
        userInfo['password'] = Md5.hashStr(this.signup.password).toString()
        userInfo['roleid'] = '2'
        userInfo['teachernumber'] = this.signup.userNo
      }
      this.commonService.postRegister(userInfo, this.signup.identity).then(async (result: any) => {
        // console.log('发送注册信息成功', result);
        if (result.status == 'success') {
          this.presentAlert('注册成功！');
          this.router.navigateByUrl('/login-in');
        }
        else {
          if (result.error == '该用户已存在') {
            this.presentAlert('该用户名已存在！');
          }
          else if (result.error == '手机号已被使用') {
            this.presentAlert('手机号已被使用!');
          }
          else if (result.data == '学号重复') {
            this.presentAlert('该学号/工号已被使用!');
          }
          else {
            this.presentAlert('注册失败!');
          }
        }
      }).catch(async (error) => {
        this.presentAlert('未知错误！');
        // console.log('发送注册信息失败', error);
      })
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
