import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  hurl = "http://47.115.121.100:3000";

  httpOptions = { //http请求头
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })//请求头进行转格式，防止出现415错误
  };

  constructor(
    public http: HttpClient
    ) {
    console.log('hello commonService!');
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
  postLogin(id, password, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/app/student/login_check';
      console.log('学生');
    }
    else {
      var url = this.hurl + '/app/teacher/login_check';
      console.log('教师');
    }
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
  change_password(updata, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/app/student/change_pass';
      console.log('学生');
    }
    else {
      var url = this.hurl + '/app/teacher/change_pass';
      console.log('教师');
    }
    console.log('发送的修改密码信息：', updata);
    return new Promise((reslove, reject) => {
      //put多用来修改资源，因为他会把重复提交的请求忽略
      //post多用来增加数据，因为不会覆盖相同请求
      this.http.put(url, JSON.stringify(updata), this.httpOptions).subscribe((response) => {
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
  getPersonById(id, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/app/student/' + id;
      console.log('学生获取id和姓名')
    }
    else {
      var url = this.hurl + '/app/teacher/' + id;
      console.log('教师获取id和姓名')
    }
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
    console.log('调用getCourseById', id);
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  findCourseById(id){
    let url = this.hurl + '/findcourse/' + id;
    console.log('查找班课编号：', id);
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  //学生签到
  studentSignIn(Studentid, longitude, latitude, courseID, signpassword) {
    let url = this.hurl + '/app/student/pos_sign/';
    // latitude=26.0471255;
    // longitude=119.33022111;
    let sign_data = {
      'Studentid': Number(Studentid),
      'longitude': longitude,//经度
      'latitude': latitude,//纬度
      'courseID': Number(courseID),
      'signpassword': Number(signpassword)
    }
    console.log('学生开始签到', sign_data);
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(sign_data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //教师

  //某一门课的考勤统计(用于返回某门课的成员名单)
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
  startSignIn(courseId, longitude, latitude, signpassword) {
    let url = this.hurl + '/app/teacher/Pos_Sign/' + courseId;
    // latitude=26.0471255;
    // longitude=119.33022111;
    let data = {
      'longitude': longitude,//经度
      'latitude': latitude,//纬度
      'signpassword': signpassword
    };
    console.log('教师发起签到', data)
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
  //根据教师工号获取创建的班课和班课信息
  getCourseByIDHql(id) {
    let url = this.hurl + '/app/teacher_course/' + id;
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  //检查本次课程登录情况
  getTodayCourseSignInInfo(course_id){
    let url = this.hurl + '/app/teacher/Coursesign_ino/' + course_id;
    console.log('教师检查本次课程登录情况:', url)
    return new Promise((reslove, reject) => {
      this.http.put(url, this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //新增班课
  postNewCourse(data){
    let url = this.hurl + '/course';
    console.log('发送新增班课信息：', data);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //修改班课信息
  editCourseInformation(data){
    let url = this.hurl + '/course';
    console.log('发送修改班课信息：', data);
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //删除班课
  DeleteCourse(course_id){
    let url = this.hurl + '/course/'+course_id;
    console.log('需要取消的课程编号：', course_id);
    return new Promise((reslove, reject) => {
      this.http.delete(url).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }



  getTest() {
    let url = 'http://47.115.121.100:3000/logintest';
    // let url='http://175.24.16.48:8082/dictionary/detail/1';
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        console.log('错误', error);
        reject(error);
      })
    })
  }

  postTest1() {
    let url = this.hurl + '/logincheck/';
    let data = {
      'username': 'admin',
      'passcode': '827ccb0eea8a706c4c34a16891f84e7b',
      'oneTimeCode': 1561814585774
    };
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }
}
