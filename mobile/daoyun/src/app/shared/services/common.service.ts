import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  hurl = "/api/";

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };

  constructor(public http: HttpClient) {
    console.log('调用commonService');
  }

  //从对应的api获取数据
  getData(url) {
    var api = url;
    //回调函数 subscribe返回api的结果，promise回调函数（异步的 ）返回对应的信息
    return new Promise((reslove, reject) => {
      this.http.get(api).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error)
        reject(error);
      })
    })
  }

  //封装了一个post请求，用于发送数据
  postData(url: String, json: Object) {
    let api = this.hurl + url;
    // let api = 'http://47.115.121.100:3000/app/student/login_check';
    console.log('请求的api', api);
    return new Promise((reslove, reject) => {
      this.http.post(api, json, this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //登入
  postLogin(id, password) {
    // let url = this.hurl + 'app/student/login_check';
    let url = 'http://47.115.121.100:3000/app/student/login_check';
    let logindata = {
      id: id,
      password: Md5.hashStr(password).toString()
    }
    console.log('发送的登录信息：', logindata);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(logindata), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //修改密码
  change_password(updata) {
    let url = this.hurl + '/app/student/change_pass';
    console.log('发送的修改密码信息：', updata);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(updata), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //添加课程
  add_course(courseid, studentid) {
    let url = this.hurl + '/app/student/add_course/' + courseid;
    let data = { 'studentid': studentid }
    console.log('发送的添加课程信息：', data);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //根据学号获取个人信息
  getPersonById(id) {
    let url = this.hurl + '/app/student/' + id;
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error)
        reject(error);
      })
    })
  }

  //根据学号获取已经添加的班课
  getCourseById(id) {
    let url = this.hurl + '/app/student_course/' + id;
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  //签到
  updateSignIn(Studentid, password, courseID) {
    let url = this.hurl + '/app/student/sign/';
    let sign_data = {
      'Studentid': Studentid,
      'password': password,
      'courseID': courseID
    }
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(sign_data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //教师

  //某一门课的考勤统计
  countAllCallTheRoll(courseid) {
    let url = this.hurl + '/app/teacher/kaoqin/' + courseid;
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }
  //开始签到
  callOverByCoursenameAndDate(courseId, password) {
    let url = this.hurl + '/app/teacher/sign/' + courseId;
    let data={ 'password': password };
    console.log('教师发起签到', data)
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  //根据教师工号获取创建的班课和班课信息
  getCourseByIDHql(id){
    let url=this.hurl+'/app/teacher_course/'+id;
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  getTest(){
    let url='http://47.115.121.100:3000/logintest';
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }
}
