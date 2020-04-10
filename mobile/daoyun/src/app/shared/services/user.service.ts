import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Register } from '../class/register';
import { AjaxResult } from '../class/ajax-result';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) { }

  signup(register: Register): Promise<AjaxResult> {
    return new Promise(((resolve, reject) => {
      // resolve
    }));
  }
  async signup1(register: Register) { //本地存储
    let user = {
      name: register.name,
      phone: register.phone,
      email: register.email,
      school: register.school,
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
                  shopName: u.shopName,
                  registerDate: u.registerDate,
                  phone: u.phone,
                  email: u.email,
                  shortName: u.shortName,
                  shopPhone: u.shopPhone,
                  businessType: u.businessType,
                  accounts: {phone: u.accounts.phone, passwordToken: u.accounts.passwordToken},
                  loginTime: new Date().toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
                };
                //将登录信息存在本地数据库
                this.localStorageService.set('login', loginUser);
                let app = this.localStorageService.get('APP', []);
                app.isLogin = true
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
