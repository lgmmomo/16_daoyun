import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    let userName = '张三';
    let password = 'abc123';
    let data = {
      userName: userName,
      password: password
    }
    console.log('转为json前：',data);
    let jsonData = JSON.stringify(data)//封装成json
    console.log('转为json后：',jsonData);
  }
  
}
