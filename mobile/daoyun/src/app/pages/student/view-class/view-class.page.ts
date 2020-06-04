import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.page.html',
  styleUrls: ['./view-class.page.scss'],
})
export class ViewClassPage implements OnInit {

  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController) { }

  public course_name = '';
  public course_id = '';
  public students = [];
  public sort_student: any;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log('传入的参数：', result);
      this.course_id = result.courseID;
      this.course_name = result.courseName;
    })
    this.commonService.countAllCallTheRoll(this.course_id).then((result: any) => {
      console.log('查询', this.course_name, '课程结果为：', result);
      for (let r of result.data) {
        console.log('r', r);
        let t = {
          StudentNumber: r.StudentNumber,
          Studentname: r.Studentname,
          ok: r.ok,
          later: r.later,
          no: r.no,
          experience: 2 * r.ok - 1 * r.later - 2 * r.no
        }
        console.log('t', t);
        this.students.push(t);
      }
      console.log('排序前', this.students)
      this.students.sort((a: any, b: any) => {
        return b.experience - a.experience;//大到小
      })
      console.log('排序后', this.students)
    }).catch((error) => {
      console.log('获取', this.course_name, '课程信息失败')
    })
  }

  onBack() {
    this.router.navigateByUrl('/tabs/tabs/tab2');
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '查看班课信息',
        handler: () => {
          console.log('班课信息');
          this.router.navigate(['/stu-class-info'], {
            queryParams: {
              course_id: this.course_id
            }
          })
          // this.router.navigateByUrl('/stu-class-info');
        }
      }, {
        text: '手势签到',
        handler: () => {
          console.log('点击手势签到');
          this.router.navigate(['/gesture-sign-in'], {
            queryParams: {
              course_id: this.course_id,
              course_name: this.course_name
            }
          })
          // this.router.navigateByUrl('/stu-class-info');
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


}
