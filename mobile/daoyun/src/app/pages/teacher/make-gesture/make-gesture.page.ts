import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
declare var PatternLock: any;
declare var BMap;

@Component({
  selector: 'app-make-gesture',
  templateUrl: './make-gesture.page.html',
  styleUrls: ['./make-gesture.page.scss'],
})
export class MakeGesturePage implements OnInit {

  constructor(private commonService: CommonService,
              private router: Router) { }

  public post_geature_url='';
  public limitTime='';
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

  onSubmit(){
    console.log('限制时间：', this.limitTime,'min 密码：',this.sign_in_number);
    let sign_in={
      limit_time:this.limitTime,
      sign_in_number:this.sign_in_number
    }
    let sign_in_json=JSON.stringify(sign_in);
    this,this.commonService.postData(this.post_geature_url, sign_in_json).then((response)=>{
      console.log('教师设置签到信息成功！');
      this.router.navigateByUrl('/exam-class');
    }).catch((error)=>{
      console.log('教师设置签到信息失败:', error);
    })
  }

}
