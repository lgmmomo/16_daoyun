import { ToastController } from '@ionic/angular';
import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var PatternLock: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private commonService: CommonService) { }

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
  
}
