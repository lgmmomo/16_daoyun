import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
  // 用于保存验证码
  private code: string
  // 存放验证码的过期时间
  private deadline: number
  constructor() {
    this.code = ''  // 储存本地生成的验证码的MD5值
  }
  // 生成指定长度的随机数字
  createCode(count: number): string {
    var code: string
    this.code = ''
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000
    for (let i = 0; i < count; i++) {
      let num = Math.floor(Math.random() * 10)
      this.code += num.toString()
    }
    code = this.code
    this.code = Md5.hashStr(this.code).toString()
    console.log('生成验证码的MD5值为：', this.code)
    return code
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean {
    let now = Date.now()
    // md5加密用户输入的短信验证码
    value = Md5.hashStr(value.toString()).toString()
    console.log('用户输入验证码的MD5值为：', value)
    return value == this.code && now < this.deadline
  }
}
