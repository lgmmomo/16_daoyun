import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-set-information',
  templateUrl: './set-information.page.html',
  styleUrls: ['./set-information.page.scss'],
})
export class SetInformationPage implements OnInit {
  isEdit = 0;//编辑状态
  isStudent = 0;//是否是学生
  identity='';
  userId='';
  loginUser = {
    name: '',
    School: '',
    Major: '',
    Class: '',
    identity: '',
    userNo: '',
  };

  constructor(private localStorageService: LocalStorageService,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService) {
    console.log('进入set-information页面')
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);

  }

  ngOnInit() {
    this.userId = this.localStorageService.get('userID', null);
    this.identity = this.localStorageService.get('identity', 'student');
    if (this.identity == 'student') {
      this.isStudent = 1;
      this.loginUser.identity = '学生';
    }
    else {
      this.isStudent = 0;
      this.loginUser.identity = '教师';
    }
    this.getData();
  }

  onEdit() {
    this.isEdit = 1;
  }

  getData(){
    this.commonService.getDetailInfo(this.identity, this.userId).then((result: any) => {
      console.log('返回个人信息成功', result);
      this.loginUser.userNo = this.userId;
      this.loginUser.Class = result.personnel.Class;
      this.loginUser.Major = result.personnel.Major;
      this.loginUser.School = result.personnel.School;
      this.loginUser.name = result.personnel.name;
    }).catch((error) => {
      console.log('返回个人信息失败', error);
    })
  }

  onSubmit() {
    this.isEdit = 0;
    let userInfo= {};
    if(this.isStudent){
      userInfo['studentname'] = this.loginUser.name;
      userInfo['studentnumber'] = this.loginUser.userNo;
      userInfo['major'] = this.loginUser.Major;
      userInfo['schooling'] = this.loginUser.School;
      userInfo['class'] = this.loginUser.Class;
    }
    else{
      userInfo['teachername'] = this.loginUser.name;
      userInfo['teachernumber'] = this.loginUser.userNo;
    }
    this.commonService.changePersonInfo(this.identity, userInfo).then((result:any)=>{
      console.log('个人信息发送成功',result);
      if(result.status=='success'){
        this.presentAlert('个人信息修改成功！');
        this.getData();
        this.isEdit=0;
      }
      else{
        this.presentAlert(result.error);
        this.getData();
        this.isEdit=0;
      }
    }).catch((error)=>{
      console.log('个人信息发送失败', error);
      this.presentAlert('发送信息失败！');
    })
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
