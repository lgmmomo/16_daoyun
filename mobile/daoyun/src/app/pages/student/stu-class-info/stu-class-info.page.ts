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
  course_information:any;
  constructor(private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private router: Router,
              private alertController: AlertController,
              private localStorageService: LocalStorageService) {
    this.activatedRoute.queryParams.subscribe((result)=>{
      console.log(result);
      this.course_id=result.course_id;
      console.log('课程编号', this.course_id);
    });
    let json=JSON.stringify({course_id: this.course_id});
    this.commonService.postData('/getCourse', json).then((response)=>{
      console.log('课程信息:', response);
      this.course_information=response;
    }).catch((error)=>{
      console.log('根据课程号查询课程失败！', error);
    })
  }

  ngOnInit() {
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
