import { CommonService } from './../../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';

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

  onClick() {
    //获取数据
    let url='productlis';
    this.submit = 1;
    this.commonService.getData(url).then((response:any)=>{
      console.log('页面返回结果', response);
      console.log('result', response.result);
      this.list = response.result;
      this.result_length = this.list.length;
      console.log(this.list[1].title);
    },(error:any)=>{
      console.log('error', error);
      this.error=error;
    })
  }
  
}
