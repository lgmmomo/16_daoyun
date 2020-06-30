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

  constructor(public http: HttpClient) {
    // console.log('hello commonService!');
  }

  //注册
  postRegister(data, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/register/student';
      // console.log('学生');
    }
    else {
      var url = this.hurl + '/register/teacher';
      // console.log('教师');
    }
    // console.log('发送的注册信息：', data);
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //登入
  postLogin(flag, id, password, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/app/student/login_check';
      // console.log('学生');
    }
    else {
      var url = this.hurl + '/app/teacher/login_check';
      // console.log('教师');
    }
    var logindata:any;
    if(flag==1){//登入用的用户名
      logindata = {
        flag: String(flag),
        username: String(id),
        password: Md5.hashStr(password).toString()
      }
    }
    else{//登入用的手机号
      logindata = {
        flag: String(flag),
        tel: String(id),
        password: Md5.hashStr(password).toString()
      }
    }
    // console.log('发送的登录信息：', logindata);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(logindata), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //获取用户ID
  getUserID(flag, loginname, identity) {
    if (identity == 'student') {
      var url = this.hurl + '/app/query_stuuser';
      // console.log('学生');
    }
    else {
      var url = this.hurl + '/app/query_teauser';
      // console.log('教师');
    }
    var data:any;
    if(flag==1){//登入用的用户名
      data = {
        flag: String(flag),
        username: String(loginname)
      }
    }
    else{//登入用的手机号
      data = {
        flag: String(flag),
        tel: String(loginname)
      }
    }
    // console.log('发送的获取用户ID信息：', data);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
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
      // console.log('学生');
    }
    else {
      var url = this.hurl + '/app/teacher/change_pass';
      // console.log('教师');
    }
    // console.log('发送的修改密码信息：', updata);
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
    // console.log('发送的添加课程信息：', data);
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
      // console.log('学生获取id和姓名')
    }
    else {
      var url = this.hurl + '/app/teacher/' + id;
      // console.log('教师获取id和姓名')
    }
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //根据身份和学号获取更加详细的个人信息
  getDetailInfo(identity, userId) {
    if (identity == 'student') {
      var url = this.hurl + '/app/get_student_info/' + userId;
      // console.log('学生获取更加详细的个人信息', userId)
    }
    else {
      var url = this.hurl + '/app/get_teacher_info/' + userId;
      // console.log('教师获取更加详细的个人信息', userId)
    }
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //根据学号获取已经添加的班课
  getCourseById(id) {
    let url = this.hurl + '/app/student_course/' + id;
    // console.log('调用getCourseById', id);
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        // console.log('错误', error);
        reject(error);
      })
    })
  }

  findCourseById(id) {
    let url = this.hurl + '/findcourse/' + id;
    // console.log('查找班课编号：', id);
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        // console.log('错误', error);
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
    // console.log('学生开始签到', sign_data);
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
        // console.log('错误', error);
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
    // console.log('教师发起签到', data)
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
    // console.log('根据教师工号获取创建的班课和班课信息', id)
    return new Promise((reslove, reject) => {
      this.http.get(url).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        // console.log('错误', error);
        reject(error);
      })
    })
  }

  //检查本次课程登录情况
  getTodayCourseSignInInfo(course_id) {
    let url = this.hurl + '/app/teacher/Coursesign_ino/' + course_id;
    // console.log('教师检查本次课程登录情况:', url)
    return new Promise((reslove, reject) => {
      this.http.put(url, this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //新增班课
  postNewCourse(data) {
    let url = this.hurl + '/course';
    // console.log('发送新增班课信息：', data);
    return new Promise((reslove, reject) => {
      this.http.post(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //修改班课信息
  editCourseInformation(data) {
    let url = this.hurl + '/course';
    // console.log('发送修改班课信息：', data);
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(data), this.httpOptions).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //删除班课
  DeleteCourse(course_id) {
    let url = this.hurl + '/course/' + course_id;
    // console.log('需要取消的课程编号：', course_id);
    return new Promise((reslove, reject) => {
      this.http.delete(url).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  //修改个人信息
  changePersonInfo(identity, data) {
    if (identity == 'student') {
      var url = this.hurl + '/user/changeinfo/student';
      // console.log('学生修改个人信息')
    }
    else {
      var url = this.hurl + '/user/changeinfo/teacher';
      // console.log('教师修改个人信息')
    }
    // console.log('发送的修改信息：', data);
    return new Promise((reslove, reject) => {
      this.http.put(url, JSON.stringify(data), this.httpOptions).subscribe((response) => { //异步方法，需要用promise返回数据
        reslove(response);
      }, (error) => {
        reject(error);
      })
    })
  }

}
