import { Component, OnInit } from '@angular/core';
import {ListService} from '../service/list.service'
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  menus:any;
  constructor(private dataService: ListService,public http: HttpClient) { }
  url : any;
  ngOnInit() {
    this.url = '';
    this.dataService.getMenus().then(data=>{
      var data_dic=data.body;
      var menu_arr=new Array()
      menu_arr=data_dic['data'];
      this.menus=menu_arr;

    });
  }


}
