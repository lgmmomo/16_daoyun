import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.page.html',
  styleUrls: ['./class-info.page.scss'],
})
export class ClassInfoPage implements OnInit {

  isEdit = 0; //不是编辑状态
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
    public actionSheetController: ActionSheetController,
    private localStorageService: LocalStorageService) {
    console.log('hello class-info page!')
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log(result);
      this.course_id = result.course_id;
      console.log('传入课程编号', this.course_id);
    });
    this.getCourse();
  }

  getCourse() {
    //获取course_id的班课信息，因为教师端不是通过班课号查找的班课，所以不会出现查找班课失败的情况
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
    }).catch((error) => {
      console.log('查找班课信息失败', error);
    })
  }

  submitClassInfo() {
    console.log('点击提交编辑信息');
    let subjectInfo: any = {} //新建课程的信息
    subjectInfo['CourseId'] = this.course_id
    subjectInfo['CourseName'] = this.course_name
    subjectInfo['TeacherName'] = this.course_teacher
    subjectInfo['CourseWeek'] = this.course_week
    subjectInfo['CourseDay'] = this.course_day
    subjectInfo['CourseTime'] = this.course_time
    subjectInfo['CoursePlace'] = this.course_place
    subjectInfo['School'] = this.course_school
    subjectInfo['stuobject'] = this.course_object
    console.log('subjectInfo', subjectInfo)
    this.commonService.editCourseInformation(subjectInfo).then(async (result: any) => {
      console.log('修改班课信息返回：', result);
      if (result.status == 'success') {
        const alert = await this.alertController.create({
          header: 'success!',
          animated: true,
          mode: 'ios',
          message: '修改班课信息成功',
          buttons: ['OK']
        });
        await alert.present();
        this.isEdit = 0;
        this.getCourse();
      }
    }).then((error) => {
      console.log('修改班课信息失败：', error);
    })
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '编辑班课',
        handler: () => {
          console.log('编辑班课');
          this.isEdit = 1;
        }
      }, {
        text: '删除班课',
        role: 'destructive',
        handler: () => {
          console.log('删除班课');
          this.presentAlertDelete();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: '您确定要删除此班课吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '删除',
          cssClass:'danger',
          handler: () => {
            console.log('Confirm Delete');
            this.commonService.DeleteCourse(this.course_id).then(async (result: any) => {
              console.log('删除班课返回信息：', result);
              if (result.status == 'success') {
                const alert = await this.alertController.create({
                  header: 'success!',
                  animated: true,
                  mode: 'ios',
                  message: '删除班课成功',
                  buttons: ['OK']
                });
                await alert.present();
                this.router.navigateByUrl('/tabs/tabs/tab1');
              }
            }).then((error) => {
              console.log('删除失败', error);
            })
          }
        }
      ]
    });
    await alert.present();
  }

}
