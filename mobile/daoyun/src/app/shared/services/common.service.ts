import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public config:any={
    domain:'http://192.168.22.XX:XXXX/'//接口公共部分
  }
  constructor(public http:HttpClient) {}//构造函数

  //从对应的api获取数据
  ajaxGet(url){
    var api=this.config.domain + url;
   //回调函数
    return new Promise ((resove,reject) =>{
      this.http.get(api).subscribe((response)=>{
        resove(response);
      },(error)=>{
        reject(error);
      })
    })
  }

  //封装了一个post请求，用于发送数据
  ajaxPost(url:String, json:Object) {
    var api = this.config.domain + url;
    return new Promise((resove, reject) => {
      this.http.post(api, json).subscribe((response) => {
        resove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

}
