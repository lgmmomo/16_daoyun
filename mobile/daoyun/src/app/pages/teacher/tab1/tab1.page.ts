import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
  course={
    subject: '工程实践',
    school: '福州大学',
    teacherName:'池芝标',
    object: '2019级专硕'
  }
  course_length=1;

}
