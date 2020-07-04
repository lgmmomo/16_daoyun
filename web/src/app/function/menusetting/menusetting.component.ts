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

  edition_id:any;
  edition_code:any;
  edition_desc:any;

  detail_id:any;
  detail_MenuID:any;
  detail_ItemKey:any;
  detail_ItemValue:any;
  detail_position:any;
  detail_isDefault:any;


  add_detail_MenuID:any;
  add_detail_ItemKey:any;
  add_detail_ItemValue:any;
  add_detail_position:any;
  add_detail_isDefault:any;

  add_menu_code:any;
  add_menu_desc:any;

  diction_all:any;
  search_text:any='';
  constructor(public http: HttpClient,private message: NzMessageService,private dataService: MenuOpService,private fb: FormBuilder) { }
  ngOnInit() {
    this.getdata();   
  }
//获取当前菜单设置已有数据
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
    this.edition_id=data.id;     //菜单类目编号，如 1 
    this.edition_code=data.code;//菜单类目名称，如人员管理类
    this.edition_desc=data.desc;//菜单类目具体描述
    this.Menu_visible = true;//  1  
  }

  //让菜单类目下菜单 显示  
  addMenuDetailopen(data){
    this.add_detail_MenuID=data.id;//菜单类目标号 （一级）  
    //this.add_detail_ItemKey='';//菜单编号 （二级）
    this.add_detail_ItemValue='';//菜单名称 如学生管理 
    this.add_detail_position='';//菜单位置 如4
    this.add_detail_isDefault='';//菜单
    this.AddMenuDetail_visible = true; //可用  1
  }

  MenuDetailopen(data): void {
    this.detail_id=data.id;
    this.detail_MenuID=data.MenuDetailID;
    //this.detail_ItemKey=data.ItemKey;
    this.detail_ItemValue=data.ItemValue;
    this.detail_position=data.position;
    this.detail_isDefault=data.isDefault+"";
    this.MenuDetail_visible = true;
  }

//编辑菜单类目    菜单类目
Menu_updata(){
    let update_Menu={
        id:this.edition_id,
        code:this.edition_code,
        desc:this.edition_desc,
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
      id:this.detail_id,
      MenuDetailID:this.detail_MenuID,
      //ItemKey:this.detail_ItemKey,
      ItemValue:this.detail_ItemValue,
      position:this.detail_position,
      isDefault:this.detail_isDefault
    }
    this.dataService.update_MenuDetail(update_MenuDetail).then(data=>{
      // console.log(data);
      if(data.status=='success'){
        this.message.create('success', `修改成功`);
        // for (let i=0;i<this.all_data.length;i++){
        //   if(this.all_data[i]['id']==update_MenuDetail.DictionaryID){
        //     for(let j=0;j<this.all_data[i]['childen'].length;j++){
        //       if(this.all_data[i]['childen'][j]['id']==update_MenuDetail.id){
        //         this.all_data[i]['childen'][j]['ItemKey']=update_MenuDetail.ItemKey;
        //         this.all_data[i]['childen'][j]['ItemValue']=update_MenuDetail.ItemValue;
        //         this.all_data[i]['childen'][j]['position']=update_MenuDetail.position;
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
    let add_MenuDetail={
      id:this.detail_id,
      MenuDetailID:this.add_detail_MenuID,
      //ItemKey:this.add_detail_ItemKey,
      ItemValue:this.add_detail_ItemValue,
      position:this.add_detail_position,
      isDefault:this.add_detail_isDefault
  }
  this.dataService.Add_MenuDetail(add_MenuDetail).then(data=>{
    // console.log(data);
    if(data.status=='success'){
      this.message.create('success', `菜单增加成功`);
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
