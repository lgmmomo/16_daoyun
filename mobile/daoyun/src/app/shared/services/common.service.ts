import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  public config:any={
    domain:'http://192.168.22.XX:XXXX/'//接口公共部分
  }

  constructor(public http:HttpClient) {}

  //从对应的api获取数据
  getData(url){
    var api=this.config.domain + url;
    //回调函数
    return new Promise ((reslove,reject) =>{
      this.http.get(api).subscribe((response)=>{ //异步方法，需要用promise返回数据
        reslove(response);
      },(error)=>{
        reject(error);
      })
    })
  }

  //封装了一个post请求，用于发送数据
  postData(url:String, json:Object) {
    const httpOptions = { //http请求头
      headers:new HttpHeaders({'Content-Type':'application/json'})//请求头进行转格式，防止出现415错误
    };
    var api = this.config.domain + url;
    return new Promise((reslove, reject) => {
      this.http.post(api, json, httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

}
