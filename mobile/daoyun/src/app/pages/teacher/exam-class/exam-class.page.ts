import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActionSheetController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-exam-class',
  templateUrl: './exam-class.page.html',
  styleUrls: ['./exam-class.page.scss'],
})
export class ExamClassPage implements OnInit {

  constructor(private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    public actionSheetController: ActionSheetController) {
    // console.log('跳入exam-class页面！');
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
  }

  public course_name = '';
  public course_id = '';
  public students = [];
  public sort_student: any;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log('传入的参数：', result);
      this.course_id = result.course_id;
      this.course_name = result.course_name;
    })
    this.refreshData(null);
  }

  refreshData(event) {
    this.students = [];
    this.commonService.countAllCallTheRoll(this.course_id).then((result: any) => {
      // console.log('查询', this.course_name, '课程结果为：', result);
      for (let r of result.data) {
        // console.log('r', r);
        let t = {
          StudentNumber: r.StudentNumber,
          Studentname: r.Studentname,
          ok: r.ok,
          later: r.later,
          no: r.no,
          experience: 2 * r.ok - 1 * r.later - 2 * r.no
        }
        // console.log('t', t);
        this.students.push(t);
      }
      // console.log('排序前', this.students)
      this.students.sort((a: any, b: any) => {
        return b.experience - a.experience;//从小到大
      })
      // console.log('排序后', this.students)
    }).catch((error) => {
      // console.log('获取', this.course_name, '课程信息失败')
      
    }).finally(()=>{
      if (event != null) { //如果不是第一次调用，则需要通知refresher控件结束工作
        event.target.complete();
      }
    })
  }


  onBack() {
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '发起签到',
        handler: () => {
          // console.log('创建签到');
          this.router.navigate(['/make-gesture'], {
            queryParams: {
              course_id: this.course_id,
              course_name: this.course_name
            }
          })
        }
      }, {
        text: '最新签到详情',
        handler: () => {
          // console.log('最新签到详情');
          this.router.navigate(['/exam-sign-in'], {
            queryParams: {
              course_id: this.course_id,
              course_name: this.course_name
            }
          })
        }
      }, {
        text: '班课信息',
        handler: () => {
          // console.log('班课信息');
          this.router.navigate(['/class-info'], {
            queryParams: {
              course_id: this.course_id
            }
          })
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
