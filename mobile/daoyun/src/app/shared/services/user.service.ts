import { SubjectInfo } from './../class/subject-info';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Register } from '../class/register';
import { AjaxResult } from '../class/ajax-result';
import { Md5 } from 'ts-md5';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private localStorageService: LocalStorageService,
              private alertController: AlertController) { }

  signup(register: Register): Promise<AjaxResult> {
    return new Promise(((resolve, reject) => {
      // resolve
    }));
  }
  async signup1(register: Register) { //用户信息本地存储
    let user = {
      name: register.name,
      phone: register.phone,
      email: register.email,
      school: register.school,
      major: register.major,
      class: register.class,
      identity: register.identity,
      userNo: register.userNo,
      sex: register.sex,
      passward: register.password, //传入的密码已经是MD5值
      accounts: {phone: register.phone, passwordToken: register.password},
      registerDate: new Date().toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
    };
    let u = this.localStorageService.get('user', []);//本地存储当前用户的信息
    u.push(user);  // 在user队列后加入注册信息
    this.localStorageService.set('user', u);
  }

  async signupSubject(subjectInfo: SubjectInfo){ //新建课程信息存储
    let s = this.localStorageService.get('subjects', []);//本地存储当前用户的信息
    let code = ''; //随机产生6位课程编号
    for (let i = 0; i < 6; i++) {
      let num = Math.floor(Math.random() * 10)
      code += num.toString()
    }
    let subject = {
      subject: subjectInfo.subject,
      subjectId: code,
      school: subjectInfo.school,
      term: subjectInfo.term, //2019-2020下半学年
      classroom: subjectInfo.classroom,
      time: subjectInfo.time,
      object: subjectInfo.object,
      start_week: subjectInfo.start_week,
      end_week: subjectInfo.end_week,
      teacherId: subjectInfo.teacherId, //老师工号
      teacherName: subjectInfo.teacherName, //老师名字
      submitTime: subjectInfo.submitTime, //提交时间
      submitPerson: subjectInfo.submitPerson, //提交人的编号
    }
    console.log('新增课程信息：', subject);
    let alert =await this.alertController.create({
      header: '创建成功课程成功',
      message: '课程号:'+subject.subjectId,
      buttons: ['确定']
    });
    alert.present();
    s.push(subject);
    this.localStorageService.set('subjects', s);
  }

  /**
   * 判断登入名和密码是否匹配
   */
  login(username: string, password: string): boolean {
      let user = this.localStorageService.get('user', null);//读取数据库中user用户表
      if (user != null) {
          console.log('输入的密码为：', password)
          password = Md5.hashStr(password).toString()
          console.log('MD5加密的密码为：', password)
          for (let u of user) { //扫描user表
            if (u.accounts.phone == username && u.accounts.passwordToken == password) {
                let loginUser = {
                  name: u.name,
                  phone: u.phone,
                  email: u.email,
                  school: u.school,
                  major: u.major,
                  class: u.class,
                  identity: u.identity, //身份
                  userNo: u.userNo, //学号 工号
                  sex: u.sex,
                  passward: u.password, //传入的密码已经是MD5值
                  accounts: {phone: u.accounts.phone, passwordToken: u.accounts.passwordToken},
                  loginTime: new Date().toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
                };
                //将登录信息存在本地数据库
                this.localStorageService.set('login', loginUser);
                let app = this.localStorageService.get('APP', []);
                app.isLogin = true
                app.identity = loginUser.identity
                this.localStorageService.set('APP', app);
                // this.events.publish('user:created',u, Date.now());
                return true;
            }
          }
      }
      return false; //user表中没有对应的用户名(手机号)和密码
  }
  // 修改密码
  update(phone: string, password: string): boolean {
      let user = this.localStorageService.get('user', null);
      if ( user != null ) {
          for (let u of user) {
              if (u.phone == phone) {
                  console.log('找到user表对应用户：', u.phone)
                  console.log('原密码MD5值为：', u.password)
                  //user表中存的是MD5值的密码
                  let passwordToken = Md5.hashStr(password).toString()
                  u.accounts.passwordToken = passwordToken;
                  u.password = passwordToken;
                  console.log('修改后密码MD5值为：', u.password)
                  break;
              }
          }
          this.localStorageService.set('user', user);
          console.log('修改成功！')
          return true;
      }
      return false;
  }
  // 判断手机号是否已经存在
  check(phone: string): boolean {
      let user = this.localStorageService.get('user', null);
      if (user != null) {
          for (let u of user) {
              if (u.phone == phone) {
                  return true;
              }
          }
      }
      return false;
  }
}
