import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  courses: any;
  courses_length = 0;
  userID = '';
  identity = '';
  constructor(public actionSheetController: ActionSheetController,
    private router: Router,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private alertController: AlertController) {
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
    this.identity = this.localStorageService.get('identity', 'teacher');
    if (this.identity == 'teacher') {
      this.userID = this.localStorageService.get('userID', null);
      this.refreshData(null);
    }
    else {
      this.courses_length = 0
    }
  }

  //刷新
  refreshData(event) {
    if (this.identity == 'student') {//如果身份为学生，则默认关闭查找创建班课的功能
      this.courses_length = 0;
      if (event != null) { //如果不是第一次调用，则需要通知refresher控件结束工作
        event.target.complete();
      }
    }
    else {
      this.commonService.getCourseByIDHql(this.userID).then((result: any) => {
        console.log('获取教师创建的课程信息成功！', result);
        this.courses = result.courses;
        this.courses_length = this.courses.length;
        console.log('courses', this.courses, 'length', this.courses_length);
      }).then((error) => {
        console.log('获取教师创建的课程信息失败！', error);
      }).finally(() => {
        if (event != null) { //如果不是第一次调用，则需要通知refresher控件结束工作
          event.target.complete();
        }
      })
    }
  }


  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '创建班课',
        handler: () => {
          console.log('创建班课');
          if (this.identity == 'teacher') {
            this.router.navigateByUrl('/new-class');
          }
          else {//学生无权限
            this.presentAlert();
          }
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: '您没有此权限',
      buttons: ['OK']
    });
    await alert.present();
  }

}
