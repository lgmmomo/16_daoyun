import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-set-information',
  templateUrl: './set-information.page.html',
  styleUrls: ['./set-information.page.scss'],
})
export class SetInformationPage implements OnInit {
  loginUser = {
    name: '',
    phone: '',
    email: '',
    school: '',
    major: '',
    class: '',
    identity: '',
    userNo: '',
    sex: ''
  };
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {  //初始化界面的时候读取数据库
      let login = this.localStorageService.get('login', null);
      if (login != null) {
        this.loginUser.name = login.name;
        this.loginUser.userNo = login.userNo;
        this.loginUser.phone = login.phone;
        this.loginUser.email = login.email;
        this.loginUser.school = login.school;
        this.loginUser.major = login.major;
        this.loginUser.class = login.class;
        this.loginUser.identity = login.identity;
        this.loginUser.sex = login.sex;
      }
  }

}
