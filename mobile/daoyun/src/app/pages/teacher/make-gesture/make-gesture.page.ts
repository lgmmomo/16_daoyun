import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
declare var PatternLock: any;
declare var BMap;

@Component({
  selector: 'app-make-gesture',
  templateUrl: './make-gesture.page.html',
  styleUrls: ['./make-gesture.page.scss'],
})
export class MakeGesturePage implements OnInit {

  constructor(private commonService: CommonService,
              private router: Router,
              public toastController: ToastController) { }

  public post_geature_url='';
  public sign_in_number:any;

  ngOnInit() {
    var that=this;
    var lock = new PatternLock("#patternHolder", {
      onDraw: function (pattern) {
        //do something with pattern
        that.sign_in_number=lock.getPattern();
      }
    });

  }

  async onSubmit(){
    console.log('min 密码：',this.sign_in_number);
    let sign_in={
      sign_in_number:this.sign_in_number
    }
    let sign_in_json=JSON.stringify(sign_in);
    this,this.commonService.postData(this.post_geature_url, sign_in_json).then(async (response)=>{
      console.log('教师设置签到信息成功！');
      const toast = await this.toastController.create({
        color: 'green',
        duration: 2000,
        message: '签到设置成功!',
      });
      toast.present();
      this.router.navigateByUrl('/exam-class');
    }).catch((error)=>{
      console.log('教师设置签到信息失败:', error);
    })
  }

}
