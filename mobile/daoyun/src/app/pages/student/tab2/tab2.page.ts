import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  scannedData: {};
  course_id: any;
  stuID = '';
  identity = '';
  courses: any;
  barcodeScannerOptions: BarcodeScannerOptions; //扫描二维码组件选项
  course_length = 0;
  constructor(public actionSheetController: ActionSheetController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private localStorageService: LocalStorageService,
    private commonService: CommonService) {
    let theme = this.localStorageService.get('data-theme', 'dark');
    document.body.setAttribute('data-theme', theme);
    // console.log('enter tab2 page');
    this.identity = this.localStorageService.get('identity', null);
    if (this.identity == 'student') {
      this.refreshData(null);
      //二维码Options
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
    }
    else { //如果是老师，则不启用该页的功能
      this.course_length = 0;
    }
  }

  refreshData(event) {
    this.stuID = this.localStorageService.get('userID', null);
    this.identity = this.localStorageService.get('identity', null);
    if (this.identity == 'teacher') {//如果身份为老师，则默认关闭查找加入班课的功能
      this.course_length = 0;
      if (event != null) { //如果不是第一次调用，则需要通知refresher控件结束工作
        event.target.complete();
      }
    }
    else {
      this.commonService.getCourseById(this.stuID).then((result: any) => {
        // console.log('根据学号请求已加入课程列表:', result);
        this.courses = result.marks;
        this.course_length = this.courses.length;
        // console.log(this.course_length);
      }).then((error) => {
        // console.log('请求课程列表失败:', error);
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
        text: '根据课程号查找班课',
        handler: () => {
          // console.log('根据课程号查找班课');
          this.identity = this.localStorageService.get('identity', null);
          if (this.identity == 'teacher') {
            this.presentAlert();
          }
          else {
            this.presentSearchAlert();
          }
        }
      }, {
        text: '根据二维码查找班课',
        handler: () => {
          // console.log('根据二维码查找班课');
          if (this.identity == 'teacher') {
            this.presentAlert();
          }
          else {
            this.barcodeScanner.scan().then(barcodeData => {
              // alert("Barcode data " + JSON.stringify(barcodeData));
              // console.log("Barcode data " + JSON.stringify(barcodeData));
              this.scannedData = barcodeData;
              this.course_id = this.scannedData['text'];//获取扫描到的班课号
              // console.log('扫描到的课程号为：', this.course_id);
              this.router.navigate(['/stu-class-info'], {
                queryParams: {
                  course_id: this.course_id
                }
              });
            }).catch(err => {
              // console.log("Error", err);
            });
          }
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentSearchAlert() {
    const alert = await this.alertController.create({
      header: '搜索班课',
      animated: true,
      mode: 'ios',
      inputs: [
        {
          name: 'course_id',
          type: 'number',
          id: 'name2-id',
          placeholder: '输入班课号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: '搜索',
          handler: (data: any) => {
            // console.log('点击搜索', data.course_id);
            this.course_id = data.course_id;
            this.router.navigate(['/stu-class-info'], {
              queryParams: {
                course_id: this.course_id
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: '老师无法查找班课哦~',
      buttons: ['OK']
    });
    await alert.present();
  }
}
