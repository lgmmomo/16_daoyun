import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { MenuController, AlertController, IonSlides } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { NgForm } from '@angular/forms';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private authenticationCode: AuthenticationCodeService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router,
    private menuController: MenuController,
    private alertController: AlertController
  ) {}

  slideIndex = 0  //用来标示现在在哪个滑动页面
  submited = false
  passwdCheck = true //密码和验证密码是否一致

  signup = {
    phone: '',
    email: '',
    name:'',//真实姓名
    school: '',//学校
    major:'',//专业
    class: '', //班级(先手动输入，后面有需求再改成下拉框)
    identity:'',//学生、老师
    userNo: '', //学号、工号
    sex:'', //男或女
    password: '',
    confirmPassword: '',
    code: '', //验证码
    submited: false  //用来表示表单是否提交过
  }
  verifyCode = {  //用来和html页面的code模块进行互动
    verifyCodeTips: '发送验证码', //验证码按钮的提示
    countdown: 60,//倒计时
    disable: false,//是否可点击发送验证码按钮
    sended: false,//是否已经发送
    submited: false,//是否提交过验证码
    verifyCodeResult: false//是否是正确的验证码
  }

  // 倒计时
  settime() {
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60
      this.verifyCode.verifyCodeTips = '重新发送'
      this.verifyCode.disable = false
      return
    } else {
      this.verifyCode.countdown--
      this.verifyCode.verifyCodeTips =
          '重新发送(' + this.verifyCode.countdown + ')'
      setTimeout(() => {
        this.settime()
      }, 1000)  //延缓1s继续执行倒计时函数
    }
  }
  async onSendSMS() {
    console.log('点击发送验证码')
    let newcode = this.authenticationCode.createCode(4)//产生4位验证码
    console.log(newcode)
    let alert =await this.alertController.create({
      header: '短信验证码',
      message: newcode,
      buttons: ['确定']
    });
    alert.present();
    this.verifyCode.disable = true//使按键不能用
    this.verifyCode.sended = true 
    //发送验证码成功后开始倒计时
    this.settime()
  }

  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides
  //字符串'signupSlides'和模板中的#signupSlides引用变量的名称一致
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true)
    this.signupSlides.lockSwipeToPrev(true)
  }
  onNext() {
    this.signupSlides.lockSwipeToNext(false)
    this.slideIndex = (this.slideIndex + 1) % 4
    this.signupSlides.slideNext()
    this.signupSlides.lockSwipeToNext(true)
  }
  onPrevious() {
    this.signupSlides.lockSwipeToPrev(false)
    this.slideIndex = (this.slideIndex - 1) % 4
    this.signupSlides.slidePrev()
    this.signupSlides.lockSwipeToPrev(true)
  }
  onSignupPhone(form: NgForm) {
    this.submited = true  //表单设置为提交过
    if (form.valid) {
      // 已通过客户端验证
      this.onNext()
    }
  }
  onSignupCode(form: NgForm) { //点击验证码的“下一步”提交表单
    this.verifyCode.submited = true
    //验证code是否一致
    if (this.authenticationCode.validate(this.signup.code)) {
      this.verifyCode.verifyCodeResult = true
      this.onNext() 
    } else {
      this.verifyCode.verifyCodeResult = false
    }
  }
  onSignupIformation(form: NgForm) {
    this.signup.submited = true //表单提交
    if (form.valid) {
      if (this.signup.password === this.signup.confirmPassword) {
        this.passwdCheck = true
        this.onSignupSave()
        this.onNext()
      } else {
        this.passwdCheck = false
      }
    }
  }
  onSignupSave() {
    let userInfo: any = {}
    userInfo['phone'] = this.signup.phone
    userInfo['email'] = this.signup.email
    userInfo['name'] = this.signup.name
    userInfo['school'] = this.signup.school
    userInfo['major'] = this.signup.major
    userInfo['class'] = this.signup.class
    userInfo['identity'] = this.signup.identity
    userInfo['userNo'] = this.signup.userNo
    userInfo['sex'] = this.signup.sex
    userInfo['password'] = Md5.hashStr(this.signup.password).toString()
    this.userService.signup1(userInfo);
  }

}
