import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-exam-sign-in',
  templateUrl: './exam-sign-in.page.html',
  styleUrls: ['./exam-sign-in.page.scss'],
})
export class ExamSignInPage implements OnInit {

  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router) {
    console.log('跳入exam-sign-in页面！');
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
  }

  public course_name = '';
  public course_id = '';

  sign_in_student = [];
  not_sign_in_student = [];
  sign_in_student_num = 0;
  not_sign_in_student_num = 0;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log('传入的参数：', result);
      this.course_id = result.course_id;
      this.course_name = result.course_name;
    })
    this.onFlash();
  }

  //刷新签到信息
  onFlash() {
    //初始化
    this.sign_in_student = [];
    this.not_sign_in_student = [];
    this.sign_in_student_num = 0;
    this.not_sign_in_student_num = 0;
    this.commonService.getTodayCourseSignInInfo(this.course_id).then((response: any) => {
      console.log('获取的今日课程签到信息成功:', response);
      let stuList = response.data;
      console.log('学生签到信息列表', stuList);
      for (let s of stuList) {
        if (s.Status == '签到') {
          let data = {
            studentName: s.stuname,
            studentId: s.studentnum
          };
          this.sign_in_student.push(data);
        }
        else {
          let data = {
            studentName: s.stuname,
            studentId: s.studentnum
          };
          this.not_sign_in_student.push(data);
        }
      }
      this.sign_in_student_num = this.sign_in_student.length;
      this.not_sign_in_student_num = this.not_sign_in_student.length;
    }).then((error) => {
      console.log('获取今日课程签到信息失败:', error);
    })
  }

  onBack() {
    console.log('调用onback方法');
    this.router.navigate(['/exam-class'], {
      queryParams: {
        course_id: this.course_id,
        course_name: this.course_name
      }
    })
  }

}
