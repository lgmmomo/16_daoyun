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

  course_id='';
  teacherName='';
  result:any;
  ID:any;
  classSession:any;
  classLocation:any;
  classDate:any;
  classOrder:any;

  hasTakenIn=0;//还未参加这门课
  course_information:any;
  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private router: Router,
              private alertController: AlertController,
              private localStorageService: LocalStorageService) {
                console.log('hello stu-class-info page!')
              }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result)=>{
      console.log(result);
      this.course_id=result.course_id;
      console.log('传入课程编号', this.course_id);
    });
    //判断该同学是否加入了班课
    let userId = this.localStorageService.get('userID', null);
    console.log('当前获取的登入ID为', userId);
    this.commonService.countAllCallTheRoll(this.course_id).then((result:any)=>{
      console.log('成功获取课程成员信息：', result);
      for(let r of result.data){
        if(r.StudentNumber==userId){
          this.hasTakenIn=1;//参加了这门课
          console.log('该同学已经参加了这门课');
          break;
        }
      }
    })
    // this.commonService.getCourseByIDHql(userId).then((result:any)=>{
    //   for(let i=0;i<result.courses.length;i++){
    //     console.log('课程',i,result.courses[i])
    //     if(result.courses[i].courseID==this.course_id){
    //       this.teacherName=result.name;
    //       this.result=result.courses[i];
    //       this.ID=result.courses[i].courseID;
    //       this.classSession=result.courses[i].classOrder;
    //       this.classLocation=result.courses[i].classLocation;
    //       this.classDate=result.courses[i].classDate;
    //       this.classOrder=result.courses[i].CourseWeek;
    //     }
    //   }
    // })

  }

  async addcourse(){ //加入该门课程
    console.log('点击加入课程');
    let student_id=this.localStorageService.get('userID', null);
    this.commonService.add_course(this.course_id, student_id).then(async (response)=>{
      console.log('加入成功', response);
      let alert =await this.alertController.create({
        animated: true,
        header: '',
        message: '加入成功！',
        buttons: ['确定']
      });
      alert.present();
      this.router.navigateByUrl('/tabs/tabs/tab2');
    }).catch((error)=>{
      console.log('加入课程失败！', error);
    })

  }

}
