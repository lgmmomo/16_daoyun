import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.page.html',
  styleUrls: ['./view-class.page.scss'],
})
export class ViewClassPage implements OnInit {

  title='';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private nav:NavController,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result)=>{
      // console.log(result);
      console.log(result.course_id);
      this.title=result.course_id;
    })
  }

  doBack(){//返回上一级，tabs之后的页面专用
    this.nav.navigateBack('/tabs/tabs/tab2');
  }

}
