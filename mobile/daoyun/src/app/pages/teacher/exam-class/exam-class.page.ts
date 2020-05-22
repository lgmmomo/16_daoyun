import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-exam-class',
  templateUrl: './exam-class.page.html',
  styleUrls: ['./exam-class.page.scss'],
})
export class ExamClassPage implements OnInit {

  constructor(private commonService: CommonService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public actionSheetController: ActionSheetController) { }

  public course_name=''; 
  student=[
    {
      id:190327001,
      name:'张三',
      experience:1
    },
    {
      id:190327002,
      name:'李四',
      experience:0
    },
    {
      id:190327003,
      name:'王五',
      experience:2
    },
  ];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result)=>{
      console.log('传入的参数：',result);
      this.course_name=result.course_name;
    })
    console.log('排序前', this.student)
    this.student.sort((a:any,b:any)=>{
      return b.experience-a.experience;//从小到大
    })
    console.log('排序后', this.student)
    // console.log(sorted_list)
  }

  onBack(){
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }

  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '创建签到',
        handler: () => {
          console.log('创建签到');
          this.router.navigateByUrl('/make-gesture');
        }
      }, {
        text: '今日签到详情',
        handler: () => {
          console.log('今日签到详情');
          this.router.navigateByUrl('/exam-sign-in');
        }
      }, {
        text: '班课信息',
        handler: () => {
          console.log('班课信息');
          this.router.navigateByUrl('/class-info');
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
