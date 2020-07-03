import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.page.html',
  styleUrls: ['./new-class.page.scss'],
})
export class NewClassPage implements OnInit {

  constructor(private toastController: ToastController,
    private alertController: AlertController,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private router: Router) { 
      let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
    }

  submited = false;
  signup = {
    subject: '',
    school: '',
    courseDay: '',
    classroom: '',
    start_time: '',
    end_time: '',
    object: '',
    start_week: '',
    end_week: '',
    submited: false  //用来表示表单是否提交过
  }

  ngOnInit() {
  }

  onSignupIformation(form: NgForm) {
    this.signup.submited = true //表单提交
    if (form.valid) {
      this.onSignupSave()
    }
  }
  onSignupSave() {
    let subjectInfo: any = {} //新建课程的信息
    subjectInfo['add_CourseName'] = this.signup.subject
    subjectInfo['add_School'] = this.signup.school
    subjectInfo['add_CoursePlace'] = this.signup.classroom
    subjectInfo['add_CourseWeek'] = this.signup.start_week + '-' + this.signup.end_week
    subjectInfo['add_CourseDay'] = this.signup.courseDay
    subjectInfo['add_stuobject'] = this.signup.object
    subjectInfo['add_CourseTime'] = this.signup.start_time + '-' + this.signup.end_time
    let userName = this.localStorageService.get('userName', null);
    subjectInfo['add_TeacherName'] = userName;
    this.commonService.postNewCourse(subjectInfo).then(async(result: any) => {
      // console.log('添加班课返回信息：', result);
      if (result.status == 'success') {
        let course_id = result.data;
        // console.log('班课号：', course_id);
        let toast = await this.toastController.create({
          animated: true,
          mode: 'ios',
          message: '创建班课成功！',
          duration: 1500,
          position: 'bottom'
      });
      toast.present();
        this.router.navigate(['/qrcode'], {
          queryParams: {
            course_id: course_id,
            course_name: this.signup.subject
          }
        })
      }
    }).catch((error)=>{
      // console.log('新建课程失败', error);
    })
  }

  onBack() {
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }

}
