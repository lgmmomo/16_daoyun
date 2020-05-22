import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
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
    private localStorageService: LocalStorageService) { }

  public gesture_sign = '';
  public EARTH_RADIUS = 6371.0;//km 地球半径 平均值，千米
  public MAX_DISTANCE = 1; //最大学生老师距离 km
  public get_teacher_location_url = '';//获取老师位置信息的api
  public post_sign_in_number_url = '';//获取签到图案的api
  public stuId='';
  public courseId='';

  ngOnInit() {
    this.stuId=this.localStorageService.get('Studentid', null);
    console.log('学号',this.stuId);
    this.courseId='';
  }

  ionViewDidEnter() {
    var that = this;//保存this指针
    var lock = new PatternLock("#patternHolder", {
      onDraw: function (pattern) { //手离开屏幕后调用
        //do something with pattern
        that.gesture_sign = lock.getPattern();
        console.log('获取签到手势：', that.gesture_sign);
        let sign_in_number = {
          number:that.gesture_sign
        };
        let sign_in_number_json = JSON.stringify(sign_in_number);
        that.getLocation().then((response: any) => {
          // console.log('获取定位信息：', response);
          console.log('学生位置：', response.point.lat, response.point.lng);
          that.commonService.getData(that.get_teacher_location_url).then((r: any) => {
            console.log('老师位置：', r.point.lat, r.point.lng);
            let distance = that.Distance(response.point.lat, response.point.lng, r.point.lat, r.point.lng);
            if(distance<that.MAX_DISTANCE){
              that.commonService.updateSignIn(that.stuId, that.gesture_sign, that.courseId)
              that.commonService.postData(that.post_sign_in_number_url, sign_in_number_json).then((sign_in_result)=>{
                console.log('签到返回的结果', sign_in_result);
              })
            }
            else{
              console.log('距离超出限制');
              lock.reset(); //清除图案
            }
          })
        }).catch((error: any) => {
          console.log('获取定位失败:', error)
        })
      }
    });
  }

  getLocation() {
    let geolocation = new BMap.Geolocation(); //新建地图对象
    return new Promise((reslove, reject) => {
      geolocation.getCurrentPosition(function (r) {
        console.log(this.getStatus())
        if (this.getStatus() == 0) {
          console.log('获取位置成功：', r.point.lat, r.point.lng);
          reslove(r);
        }
        else {
          console.log('获取位置失败:', this.getStatus());
          reject(this.getStatus());
        }
      });
    })
  }

  HaverSin(theta) {
    var v = Math.sin(theta / 2);
    return v * v;
  }

  /// <summary>
  /// 给定的经度1，纬度1；经度2，纬度2. 计算2个经纬度之间的距离。
  /// </summary>
  /// <param name="lat1">经度1</param>
  /// <param name="lon1">纬度1</param>
  /// <param name="lat2">经度2</param>
  /// <param name="lon2">纬度2</param>
  /// <returns>距离（公里、千米）</returns>
  Distance(lat1, lon1, lat2, lon2) {
    //用haversine公式计算球面两点间的距离。
    //经纬度转换成弧度
    lat1 = this.ConvertDegreesToRadians(lat1);
    lon1 = this.ConvertDegreesToRadians(lon1);
    lat2 = this.ConvertDegreesToRadians(lat2);
    lon2 = this.ConvertDegreesToRadians(lon2);

    //差值
    var vLon = Math.abs(lon1 - lon2);
    var vLat = Math.abs(lat1 - lat2);

    //h is the great circle distance in radians, great circle就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆。
    var h = this.HaverSin(vLat) + Math.cos(lat1) * Math.cos(lat2) * this.HaverSin(vLon);

    var distance = 2 * this.EARTH_RADIUS * Math.asin(Math.sqrt(h));

    return distance;
  }

  /// <summary>
  /// 将角度换算为弧度。
  /// </summary>
  /// <param name="degrees">角度</param>
  /// <returns>弧度</returns>
  ConvertDegreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  ConvertRadiansToDegrees(radian) {
    return radian * 180.0 / Math.PI;
  }


}
