import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-sign-in',
  templateUrl: './exam-sign-in.page.html',
  styleUrls: ['./exam-sign-in.page.scss'],
})
export class ExamSignInPage implements OnInit {

  constructor() { }

  student=[
    {
      id:190327001,
      name:'张三',
      experience:2
    },
    {
      id:190327002,
      name:'李四',
      experience:1
    },
  ];

  ngOnInit() {
  }

}
