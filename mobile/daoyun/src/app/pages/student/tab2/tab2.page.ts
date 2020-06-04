import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  scannedData: {};
  course_id:any;
  stuID='';
  identity='';
  courses:any;
  barcodeScannerOptions: BarcodeScannerOptions; //扫描二维码组件选项
  course_length=0;
  constructor(public actionSheetController: ActionSheetController,
              private router: Router,
              private barcodeScanner: BarcodeScanner,
              private alertController: AlertController,
              private localStorageService: LocalStorageService,
              private commonService: CommonService ) {
    this.identity=this.localStorageService.get('identity', null);
    if(this.identity=='student'){
      this.stuID=this.localStorageService.get('userID', null);
      console.log('enter tab2 page');
      this.commonService.getCourseById(this.stuID).then((result:any)=>{
        console.log('根据学号请求已加入课程列表:', result);
        this.courses=result.marks;
        this.course_length=this.courses.length;
        console.log(this.course_length);
      }).then((error)=>{
        console.log('请求课程列表失败:', error);
      })
      //二维码Options
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
    }
    else{
      this.course_length=0;
    }
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '根据课程号查找班课',
        handler: () => {
          console.log('根据课程号查找班课');
          this.presentSearchAlert();
          // this.router.navigateByUrl('/make-gesture');
        }
      }, {
        text: '根据二维码查找班课',
        handler: () => {
          console.log('根据二维码查找班课');
          // this.course_id='1';
          this.barcodeScanner.scan().then(barcodeData => {
            // alert("Barcode data " + JSON.stringify(barcodeData));
            console.log("Barcode data " + JSON.stringify(barcodeData));
            this.scannedData = barcodeData;
            this.course_id = this.scannedData['text'];//获取扫描到的班课号
            console.log('扫描到的课程号为：', this.course_id);
            this.router.navigate(['/stu-class-info'],{
              queryParams:{
                course_id: this.course_id
              }
            });
          }).catch(err => {
            console.log("Error", err);
          });
          // this.router.navigate(['/stu-class-info'],{
          //   queryParams:{
          //     course_id: this.course_id
          //   }
          // });
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
            console.log('Confirm Cancel');
          }
        }, {
          text: '搜索',
          handler: (data:any) => {
            console.log('点击搜索',data.course_id);
            this.course_id=data.course_id;
            this.router.navigate(['/stu-class-info'],{
              queryParams:{
                course_id: this.course_id
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
