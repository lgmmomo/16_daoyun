import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
declare var PatternLock: any;
declare var BMap;
// declare var BMapLib;

@Component({
  selector: 'app-gesture-sign-in',
  templateUrl: './gesture-sign-in.page.html',
  styleUrls: ['./gesture-sign-in.page.scss'],
})
export class GestureSignInPage implements OnInit {

  constructor(private commonService: CommonService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router) {
    // console.log('转入gesture-sign-in页面！')
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
  }

  public gesture_sign = '';
  public EARTH_RADIUS = 6371.0;//km 地球半径 平均值，千米
  public MAX_DISTANCE = 1; //最大学生老师距离 km
  public get_teacher_location_url = '';//获取老师位置信息的api
  public post_sign_in_number_url = '';//获取签到图案的api
  public stuId = '';
  public courseId = '';
  public courseName = '';
  public hasPost=0;

  ngOnInit() {
    this.stuId = this.localStorageService.get('Studentid', null);
    // console.log('用户id号', this.stuId);//签到的API用的不是学号
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log('传入的参数：', result);
      this.courseId = result.course_id;
      this.courseName = result.course_name;
    })
  }

  ionViewDidEnter() {
    var that = this;//保存this指针
    var lock = new PatternLock("#patternHolder", {
      onDraw: function (pattern) { //手离开屏幕后调用
        //do something with pattern
        that.hasPost=1;
        that.gesture_sign = lock.getPattern();
        // console.log('获取签到手势：', that.gesture_sign);
        that.getLocation().then((response: any) => {
          // console.log('获取定位信息：', response);
          // console.log('学生位置：', response.point.lat, response.point.lng);
          that.commonService.studentSignIn(that.stuId, response.point.lng, response.point.lat, that.courseId, that.gesture_sign).then(async (result: any) => {
            // console.log('返回的签到信息', result);
            that.hasPost=0;
            let flag = result.status;
            if (flag == '0') {
              const alert = await that.alertController.create({
                animated: true,
                mode: 'ios',
                message: '当前课程尚未有老师发起签到！',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '1') {
              const alert = await that.alertController.create({
                animated: true,
                mode: 'ios',
                message: '当前时间段课程无签到！',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '2') {
              const alert = await that.alertController.create({
                animated: true,
                mode: 'ios',
                message: '你已签到，请勿重复签到',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '3') {
              const alert = await that.alertController.create({
                header: '签到失败',
                animated: true,
                mode: 'ios',
                message: '签到手势错误！',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '4') {
              const alert = await that.alertController.create({
                header: '签到失败',
                animated: true,
                mode: 'ios',
                message: '超出签到距离！',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '5') {
              const alert = await that.alertController.create({
                animated: true,
                mode: 'ios',
                message: '签到成功，但已迟到',
                buttons: ['OK']
              });
              await alert.present();
            }
            else if (flag == '6') {
              const alert = await that.alertController.create({
                animated: true,
                mode: 'ios',
                message: '签到成功!',
                buttons: ['OK']
              });
              await alert.present();
              //签到成功转入view-class页面
              that.router.navigate(['/view-class'], {
                queryParams: {
                  courseID: that.courseId,
                  courseName: that.courseName
                }
              })
            }
            else {
              const alert = await that.alertController.create({
                header: 'warning!',
                animated: true,
                mode: 'ios',
                message: '未知错误!',
                buttons: ['OK']
              });
              await alert.present();
            }
          })
        }).catch(async (error: any) => {
          this.hasPost=0;
          // console.log('获取定位失败:', error)
          const alert = await that.alertController.create({
            header: 'Warning!',
            animated: true,
            mode: 'ios',
            message: '定位失败!请检查权限',
            buttons: ['OK']
          });
          await alert.present();
        })
      }
    });
  }

  getLocation() {
    let geolocation = new BMap.Geolocation(); //新建地图对象
    return new Promise((reslove, reject) => {
      geolocation.getCurrentPosition(function (r) {
        // console.log(this.getStatus())
        if (this.getStatus() == 0) {
          // console.log('获取位置成功：', r.point.lat, r.point.lng);
          reslove(r);
        }
        else {
          // console.log('获取位置失败:', this.getStatus());
          reject(this.getStatus());
        }
      });
    })
  }

}
