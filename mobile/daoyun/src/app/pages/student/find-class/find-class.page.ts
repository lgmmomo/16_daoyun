import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-class',
  templateUrl: './find-class.page.html',
  styleUrls: ['./find-class.page.scss'],
})
export class FindClassPage implements OnInit {

  search_class_id: string; //搜索栏输入的search

  constructor() { }

  ngOnInit() {
  }
  searchClass(e){
    // e.data 只记录最后输入的内容，而不是全部的，用ng-model 
    if(!this.search_class_id){ //如果什么都没输入的话，显示全部课程
      // this.getClassList('');
    }else{
      // this.getClassList(this.search_class_id);
    }
  }

}
