import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private userService: UserService,
    private commonService: CommonService
  ) { }

  slideIndex = 0  //用来标示现在在哪个滑动页面
  submited = false
  passwdCheck = true //密码和验证密码是否一致

  signup = {
    phone: '',
    email: '',
    name: '',//真实姓名
    school: '',//学校
    major: '',//专业
    class: '', //班级(先手动输入，后面有需求再改成下拉框)
    identity: '',//学生、老师
    userNo: '', //学号、工号
    sex: '', //男或女
    password: '',
    confirmPassword: '',
    code: '', //验证码
    submited: false  //用来表示表单是否提交过
  }

  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides
  //字符串'signupSlides'和模板中的#signupSlides引用变量的名称一致
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true)
    this.signupSlides.lockSwipeToPrev(true)
  }
  onNext() {
    this.signupSlides.lockSwipeToNext(false)
    this.slideIndex = (this.slideIndex + 1) % 2
    this.signupSlides.slideNext()
    this.signupSlides.lockSwipeToNext(true)
  }
  onPrevious() {
    this.signupSlides.lockSwipeToPrev(false)
    this.slideIndex = (this.slideIndex - 1) % 2
    this.signupSlides.slidePrev()
    this.signupSlides.lockSwipeToPrev(true)
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
    //发送到服务器
    let url = '';//注册的接口
    let jsonData = JSON.stringify(userInfo);//封装成json
    console.log('发送的注册信息为:', jsonData);
    this.commonService.postData(url, jsonData).then((response) => {
      console.log(response);//接收状态码（注册成功、失败、网络连接错误、已经有此用户名）
    },(error)=>{
      console.log('出现错误', error);
    })
  }

}
