import { ToastController, AlertController } from '@ionic/angular';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { preserveWhitespacesDefault } from '@angular/compiler';
declare var PatternLock: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private commonService: CommonService,
    private router: Router,private alertController: AlertController) { }

  public list:any[] = [];
  public result_length = 0;
  public submit = 0;
  public error:any;
  ngOnInit() {
  }

  ionViewDidEnter(){
    console.log('1');
    var lock = new PatternLock("#patternHolder",{
      onDraw:function(pattern){
        //do something with pattern
        console.log(lock.getPattern());
    }
    });
  }

  onClick() {
    //获取数据
    let url='productlist';
    this.submit = 1;
    this.commonService.getData(url).then((response:any)=>{
      console.log('页面返回结果', response);
      console.log('result', response.result);
      this.list = response.result;
      this.result_length = this.list.length;
      // console.log(this.list[1].title);
    }).catch((error:any)=>{
      this.result_length = 0;
      this.error=error;
      console.log(this.result_length, this.submit);
      console.log('error方法:', error);
    })
  }

  onTest(){
    this.commonService.getTest().then((r)=>{
      console.log('success',r);
    }).then((err)=>{
      console.log('error!',err);
    })
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '搜索班课',
      animated: true,
      mode: 'ios',
      inputs: [
        {
          name: 'course_id',
          type: 'number',
          id: 'name2-id',
          placeholder: '输入班课号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '搜索',
          handler: (data:any) => {
            console.log('点击搜索',data.course_id);
          }
        }
      ]
    });
    await alert.present();
  }
  
}
