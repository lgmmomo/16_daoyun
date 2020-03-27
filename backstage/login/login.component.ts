import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {LoginService} from '../service/login.service'
import { MD5} from "crypto-js";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private login_check: LoginService,private fb: FormBuilder,private router: Router,private message: NzMessageService) { }

  form: FormGroup;
  error = '';
  loading = false;
  loadingdesc = '登录';
  submitTime = new Date();
  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }


  submitForm(): void {
    this.error = '';
    const loginParams = {
      username: this.userName.value,
      passcode: MD5(this.password.value).toString(),
      oneTimeCode: this.submitTime.getTime()
    };
    if (this.form.valid) {
      this.loading = true;
      this.loadingdesc = '登录中...';

      // console.log(MD5(loginParams.passcode).toString())
      this.login_check.login_check(loginParams).then(data=>{
        if(data.status=='success'){
          // console.log(data.data.role);
            sessionStorage.setItem('login_status', 'True');
            sessionStorage.setItem('username', data.data.username);
            sessionStorage.setItem('roleid', data.data.role);
            this.router.navigate(['function']);
        }
        else{
          this.form.get('password').setValue("");
          sessionStorage.setItem('login_status', 'False');
          this.createBasicMessage(data.error);
          this.loading = false;
          this.loadingdesc = '登录';
        }
      })

      // if (loginParams.loginId === 'admin' && loginParams.passcode === '12345678') {
      //   sessionStorage.setItem('login_status', 'True');
      //   this.router.navigate(['function']);
  
      // }else{
      //   this.form.get('password').setValue("");
      //   sessionStorage.setItem('login_status', 'False');
      //   this.createBasicMessage();
      // }

   }
   else{
    this.message.create('error', `用户名和密码不能为空`);
   }
  }
  get userName() { return this.form.controls.userName; }
  get password() { return this.form.controls.password; }
  createBasicMessage(info): void {
    this.message.create('error', info);
  }
}
