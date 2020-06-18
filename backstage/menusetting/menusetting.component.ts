import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
//import{MenuOpService} from '../../../service/menu-op.service'
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { computeStyle } from '@angular/animations/browser/src/util';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuOpService } from 'src/app/service/menu-op.service';
@Component({
  selector: 'app-menusetting',
  templateUrl: './menusetting.component.html',
  styleUrls: ['./menusetting.component.css']
})
export class MenusettingComponent implements OnInit {
  all_data :any[] = [];

  
  popover_visible=false;
  Menu_visible = false;
  MenuDetail_visible=false;
  AddMenuDetail_visible=false;
  Add_Menu_visible=false;

  edition_id1:any;
  edition_code1:any;
  edition_desc1:any;

  detail_id1:any;
  detail_MenuID:any;
  detail_ItemKey1:any;
  detail_ItemValue1:any;
  detail_position1:any;
  detail_isDefault1:any;


  add_detail_MenuID:any;
  add_detail_ItemKey1:any;
  add_detail_ItemValue1:any;
  add_detail_position1:any;
  add_detail_isDefault1:any;

  add_menu_code:any;
  add_menu_desc:any;

  diction_all:any;
  search_text:any='';
  constructor(public http: HttpClient,private message: NzMessageService,private dataService: MenuOpService,private fb: FormBuilder) { }
  ngOnInit() {
    this.getdata();   
  }

  getdata():void{
    this.dataService.get_menu().then(data=>{
      if(data.body.status=='error'){
        this.message.create('error', data.body.error);
      }else{
      this.all_data=data.body.data;
      this.diction_all=data.body.data;
      for (let i=0;i<this.all_data.length;i++){
        this.all_data[i]['expend']=false;
        this.diction_all[i]['expend']=false;
      } 
    }
    });
  }

  Menuopen(data): void {
    this.edition_id1=data.id1;
    this.edition_code1=data.code1;
    this.edition_desc1=data.desc1;
    this.Menu_visible = true;
  }

  //增加子字典 显示
  addMenuDetailopen(data){
    this.add_detail_MenuID=data.id1;
    this.add_detail_ItemKey1='';
    this.add_detail_ItemValue1='';
    this.add_detail_position1='';
    this.add_detail_isDefault1='';
    this.AddMenuDetail_visible = true;
  }

  MenuDetailopen(data): void {
    this.detail_id1=data.id1;
    this.detail_MenuID=data.MenuID;
    this.detail_ItemKey1=data.ItemKey1;
    this.detail_ItemValue1=data.ItemValue1;
    this.detail_position1=data.position1;
    this.detail_isDefault1=data.isDefault1+"";
    this.MenuDetail_visible = true;
  }


Menu_updata(){
    let update_Menu={
        id1:this.edition_id1,
        code1:this.edition_code1,
        desc1:this.edition_desc1,
    }
    this.dataService.update_Menu(update_Menu).then(data=>{
      // console.log(data);
      if(data.status=='success'){
        this.message.create('success', `修改成功`);
        // for (let i=0;i<this.all_data.length;i++){
        //   if(this.all_data[i]['id']==update_Dictionary.id){
        //     this.all_data[i]['code']=update_Dictionary.code;
        //     this.all_data[i]['desc']=update_Dictionary.desc;
        //     break;
        //   }
        // }
        this.getdata(); 
        this.Menu_visible = false;  
      }else{
        this.message.create('error', data.error);
      }
    });
   

  }
//菜单更新
MenuDetail_updata(){
    let update_MenuDetail={
      id1:this.detail_id1,
      MenuID:this.detail_MenuID,
      ItemKey1:this.detail_ItemKey1,
      ItemValue1:this.detail_ItemValue1,
      position1:this.detail_position1,
      isDefault1:this.detail_isDefault1
    }
    this.dataService.update_MenuDetail(update_MenuDetail).then(data=>{
      // console.log(data);
      if(data.status=='success'){
        this.message.create('success', `修改成功`);
        // for (let i=0;i<this.all_data.length;i++){
        //   if(this.all_data[i]['id']==update_DictionaryDetail.DictionaryID){
        //     for(let j=0;j<this.all_data[i]['childen'].length;j++){
        //       if(this.all_data[i]['childen'][j]['id']==update_DictionaryDetail.id){
        //         this.all_data[i]['childen'][j]['ItemKey']=update_DictionaryDetail.ItemKey;
        //         this.all_data[i]['childen'][j]['ItemValue']=update_DictionaryDetail.ItemValue;
        //         this.all_data[i]['childen'][j]['position']=update_DictionaryDetail.position;
        //         break;
        //       }
        //     }
        //   }
        // }
        this.getdata(); 
        this.MenuDetail_visible = false;
      }else{
        this.message.create('error', data.error);
      }
    });
    
  }
//Drawer抽屉关闭
  close(): void {
    this.Menu_visible = false;
    this.MenuDetail_visible = false;
    this.AddMenuDetail_visible = false;
    this.Add_Menu_visible=false;
  }

  add_MenuDetail(){
    let add_DictionaryDetail={
      id1:this.detail_id1,
      MenuID:this.add_detail_MenuID,
      ItemKe1:this.add_detail_ItemKey1,
      ItemValue1:this.add_detail_ItemValue1,
      position1:this.add_detail_position1,
      isDefault1:this.add_detail_isDefault1
  }
  this.dataService.Add_MenuDetail(add_DictionaryDetail).then(data=>{
    // console.log(data);
    if(data.status=='success'){
      this.message.create('success', `子字典增加成功`);
      this.getdata(); 
      this.AddMenuDetail_visible = false;
    }else{
      this.message.create('error', data.error);
    }
  });
  

}
  delet_Menu(data_all){
    this.dataService.Delet_Menu(data_all.id).then(
      data=>{
        // console.log(data);
        if(data.status=='success'){
          this.message.create('success', `删除成功`);
          this.getdata(); 
        }else{
          this.message.create('error',data.error);
        }
      }
    )
  }
  delet_MenuDetail(data_all){
    this.dataService.Delet_MenuDetail(data_all.id).then(
      data=>{
        // console.log(data);
        if(data.status=='success'){
          this.message.create('success', `删除成功`);
          this.getdata(); 
        }else{
          this.message.create('error', data.error);
        }
      }
    )
  }

  add_Menu_open(){
    this.add_menu_code="";
    this.add_menu_desc="";
    this.Add_Menu_visible=true;
  }

  add_Menu(){
    let add_MenuDetail={
      code:this.add_menu_code,
      desc:this.add_menu_desc
    }
    this.dataService.Add_Menu(add_MenuDetail).then(
      data=>{
        // console.log(data);
        if(data.status=='success'){
          this.message.create('success', `添加成功`);
          this.getdata(); 
          this.Add_Menu_visible = false;
        }else{
          this.message.create('error', data.error);
        }
      })
      
  }

  search_data(){
    console.log(this.all_data);
    this.all_data=[];
    // console.log(this.search_text);
    if (this.search_text==''){
      this.all_data=this.diction_all;
    }
    else{
      for(let i=0;i<this.diction_all.length;i++){
          if(this.diction_all[i]['code'].includes(this.search_text) || this.diction_all[i]['desc'].includes(this.search_text)) {
            this.all_data.push(this.diction_all[i]);
            continue;
          }
          else{
              for (let j=0;j<this.diction_all[i]['childen'].length;j++){
                  if(this.diction_all[i]['childen'][j]['ItemValue'].includes(this.search_text)){
                    this.all_data.push(this.diction_all[i]);
                    break;
                  }
              }
          }

      }
    }
  }

}
