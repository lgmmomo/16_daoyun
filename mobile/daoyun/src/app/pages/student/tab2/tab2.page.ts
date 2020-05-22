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
  courses:any;

  course=[
    {
      id:0,
      subject: '工程实践',
      school: '福州大学',
      teacherName:'池芝标',
      object: '2019级专硕'
    },
    {
      id:1,
      subject: '软件工程',
      school: '福州大学',
      teacherName:'zhangdong',
      object: '2019级专硕'
    },
  ];
  course_length=0;
  constructor(public actionSheetController: ActionSheetController,
              private router: Router,
              private barcodeScanner: BarcodeScanner,
              private alertController: AlertController,
              private barcodeScannerOptions: BarcodeScannerOptions,
              private localStorageService: LocalStorageService,
              private commonService: CommonService) {
    this.stuID=this.localStorageService.get('userID', null);
    this.commonService.getCourseById(this.stuID).then((result:any)=>{
      console.log('根据学号请求已加入课程列表:', result);
      this.courses=result.marks;
      this.course_length=this.course.length;
      console.log(this.course_length);
    }).then((error)=>{
      console.log('请求加入课程失败:', error);
    })
    this.course_length=this.course.length;
    console.log(this.course_length);
    //二维码Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
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
            alert("Barcode data " + JSON.stringify(barcodeData));
            this.scannedData = barcodeData;
            this.course_id = this.scannedData['text'];//获取扫描到的班课号
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
