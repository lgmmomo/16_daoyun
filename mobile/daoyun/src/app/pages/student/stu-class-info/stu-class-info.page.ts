import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-stu-class-info',
  templateUrl: './stu-class-info.page.html',
  styleUrls: ['./stu-class-info.page.scss'],
})
export class StuClassInfoPage implements OnInit {

  course_id = '';
  course_name = '';
  course_day = '';
  course_place = '';
  course_time = '';
  course_week = '';
  course_teacher = '';
  course_school = '';
  course_object = '';

  hasTakenIn = 0;//还未参加这门课
  hasThisClass = 0;

  course_information: any;
  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private alertController: AlertController,
    private localStorageService: LocalStorageService) {
    console.log('hello stu-class-info page!')
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log(result);
      this.course_id = result.course_id;
      console.log('传入课程编号', this.course_id);
    });
    //获取course_id的班课信息
    this.commonService.findCourseById(this.course_id).then(async (result: any) => {
      console.log('查找班课返回信息：', result);
      if (result.status == 'success') {
        this.hasThisClass = 1;//有这门课，可以显示所有控件
        this.course_day = result.data[0].CourseDay;
        this.course_name = result.data[0].CourseName;
        this.course_place = result.data[0].CoursePlace;
        this.course_time = result.data[0].CourseTime;
        this.course_week = result.data[0].CourseWeek;
        this.course_school = result.data[0].School;
        this.course_teacher = result.data[0].TeacherName;
        this.course_object = result.data[0].stuobject;
      }
      else {
        const alert = await this.alertController.create({
          header: '错误',
          animated: true,
          mode: 'ios',
          message: '没有对应的课程!',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl('/tabs/tabs/tab2');
      }
    }).catch((error) => {
      console.log('查找班课信息失败', error);
    })
    //判断该同学是否加入了班课
    let userId = this.localStorageService.get('userID', null);
    console.log('当前获取的登入ID为', userId);
    this.commonService.countAllCallTheRoll(this.course_id).then((result: any) => {
      console.log('成功获取课程成员信息：', result);
      for (let r of result.data) {
        if (r.StudentNumber == userId) {
          this.hasTakenIn = 1;//参加了这门课
          console.log('该同学已经参加了这门课');
          break;
        }
      }
    })

  }

  async addcourse() { //加入该门课程
    console.log('点击加入课程');
    let student_id = this.localStorageService.get('Studentid', null);//用学生编号加入课程
    this.commonService.add_course(this.course_id, student_id).then(async (response) => {
      console.log('加入成功', response);
      let alert = await this.alertController.create({
        animated: true,
        mode: 'ios',
        header: '',
        message: '加入成功！',
        buttons: ['确定']
      });
      alert.present();
      this.router.navigateByUrl('/tabs/tabs/tab2');
    }).catch((error) => {
      console.log('加入课程失败！', error);
    })

  }

}
