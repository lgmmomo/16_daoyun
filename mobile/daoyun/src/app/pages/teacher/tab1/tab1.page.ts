import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  course=[
    {
      id:0,
      subject: '工程实践',
      school: '福州大学',
      teacherName:'池芝标',
      object: '2019级专硕'
    },
    {
      id:1,
      subject: '软件工程',
      school: '福州大学',
      teacherName:'zhangdong',
      object: '2019级专硕'
    },
  ];
  course_length=0;

  constructor(public actionSheetController: ActionSheetController,
              private router: Router) {
    this.course_length=this.course.length;
    console.log(this.course_length);
  }
  
  async showMenu() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: '创建班课',
        handler: () => {
          console.log('创建班课');
          this.router.navigateByUrl('/make-gesture');
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
