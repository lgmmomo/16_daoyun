import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/service/index.service';
import { NzMessageService } from 'ng-zorro-antd';
import { MD5} from "crypto-js";
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(private index:IndexService,public message: NzMessageService,public router: Router) { }
  username:any;
  updata:any = false;
  confirmnewpsw:any ='';
  newpsw:any ='';
  loginname:any;
  ngOnInit() {
    this.getInfo();
  }
  getInfo()
  {
    this.username = sessionStorage.getItem('username');
    console.log(this.username);
  }

  logout(){
    sessionStorage.clear();
    sessionStorage.getItem('username');
    this.router.navigateByUrl('/login');
  }


  EditUseropen(username)
  {
    //console.log(username);
    // this.index.getInformation(username).then(data => {
    //   console.log(data.body.data);
    //   let info = data.body.data;
    //   this.loginname = info['loginname'];
    // });
    this.loginname = username;
    this.updata = true;
  }
  updateclose()
  {
    this.newpsw ='';
    this.confirmnewpsw = '';
    this.updata = false;
  }

  updataUser()
  {
    console.log(this.newpsw);
    if(this.newpsw != this.confirmnewpsw){
      this.message.create('error','两次输入不一致');
    }
    else if(this.newpsw =='' && this.confirmnewpsw == ''){
      let u = {
        'username':this.username,
        'loginname':this.loginname,
      }
      console.log(u);
      this.index.updateLoginname(u).then(data => {
        if(data.status == 'success') {
          this.message.create('success', `修改成功`);
          sessionStorage.setItem('username',this.loginname);
          this.getInfo();
        }
        else{
          this.message.create('error', '修改失败');
        }
      });
    }
    else{
      let updataInfo = {
        'newpassword':MD5(this.newpsw).toString(),
        'username':this.username,
        'loginname':this.loginname,
        
      }
      console.log(updataInfo);
      this.index.getInformation(updataInfo).then(data => {
        //console.log(data.body.data);
        if(data.status == 'success') {
          this.message.create('success', `修改成功`);
          sessionStorage.setItem('username',this.loginname);
          this.getInfo();
        }
        else{
          this.message.create('error', '修改失败');
        }
      });
    }
    this.updata = false;
  }
}
