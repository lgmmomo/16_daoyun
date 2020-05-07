import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  //查找该账户下的加入班课列表,读取班课信息
  course={
    subject: '工程实践',
    school: '福州大学',
    teacherName:'池芝标',
    object: '2019级专硕'
  }
  course_length=1;

}
