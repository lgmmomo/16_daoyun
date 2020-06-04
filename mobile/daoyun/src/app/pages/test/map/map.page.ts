import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var BMap;
declare var BMapLib;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  myGeo: any;
  @ViewChild('map', {static: true}) allmap: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(r => {
      console.log(r.point.lat, r.point.lng);
      console.log(parseFloat(r.point.lat))
    });
    this.map = new BMap.Map(this.allmap.nativeElement, {enableMapClick: true});    // 创建Map实例
    // this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    // 添加地图类型控件
    this.map.centerAndZoom('福州', 13);
    this.map.enableScrollWheelZoom(true);   // 开启鼠标滚轮缩放
    // this.myGeo = new BMap.Geocoder();
    // this.map.addControl(new BMap.GeolocationControl());
    // this.map.addControl(new BMap.MapTypeControl({
    //   mapTypes:[
    //     BMAP_NORMAL_MAP,
    //     BMAP_HYBRID_MAP
    //   ]}));
    // this.map.setCurrentCity('北京');          // 设置地图显示的城市 此项是必须设置的
  }

}
