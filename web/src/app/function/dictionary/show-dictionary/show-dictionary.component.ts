import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
import{DictionaryOpService} from '../../../service/dictionary-op.service'
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { computeStyle } from '@angular/animations/browser/src/util';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-show-dictionary',
  templateUrl: './show-dictionary.component.html',
  styleUrls: ['./show-dictionary.component.css']
})
export class ShowDictionaryComponent implements OnInit {
  all_data :any[] = [];

  
  popover_visible=false;
  Dictionary_visible = false;
  DictionaryDetail_visible=false;
  AddDictionaryDetail_visible=false;
  Add_Dictionary_visible=false;

  edition_id:any;
  edition_code:any;
  edition_desc:any;

  detail_id:any;
  detail_DictionaryID:any;
  detail_ItemKey:any;
  detail_ItemValue:any;
  detail_position:any;
  detail_isDefault:any;


  add_detail_DictionaryID:any;
  add_detail_ItemKey:any;
  add_detail_ItemValue:any;
  add_detail_position:any;
  add_detail_isDefault:any;

  add_dictionary_code:any;
  add_dictionary_desc:any;

  diction_all:any;
  search_text:any='';
  constructor(public http: HttpClient,private message: NzMessageService,private dataService: DictionaryOpService,private fb: FormBuilder) { }
  ngOnInit() {
    this.getdata();   
  }

  getdata():void{
    this.dataService.get_dictionary().then(data=>{
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

  Dictionaryopen(data): void {
    this.edition_id=data.id;
    this.edition_code=data.code;
    this.edition_desc=data.desc;
    this.Dictionary_visible = true;
  }

  //增加子字典 显示
  addDictionaryDetailopen(data){
    this.add_detail_DictionaryID=data.id;
    this.add_detail_ItemKey='';
    this.add_detail_ItemValue='';
    this.add_detail_position='';
    this.add_detail_isDefault='';
    this.AddDictionaryDetail_visible = true;
  }

  DictionaryDetailopen(data): void {
    this.detail_id=data.id;
    this.detail_DictionaryID=data.DictionaryID;
    this.detail_ItemKey=data.ItemKey;
    this.detail_ItemValue=data.ItemValue;
    this.detail_position=data.position;
    this.detail_isDefault=data.isDefault+"";
    this.DictionaryDetail_visible = true;
  }


Dictionary_updata(){
    let update_Dictionary={
        id:this.edition_id,
        code:this.edition_code,
        desc:this.edition_desc,
    }
    this.dataService.update_Dictionary(update_Dictionary).then(data=>{
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
        this.Dictionary_visible = false;  
      }else{
        this.message.create('error', data.error);
      }
    });
   

  }
//子字典更新
DictionaryDetail_updata(){
    let update_DictionaryDetail={
      id:this.detail_id,
      DictionaryID:this.detail_DictionaryID,
      ItemKey:this.detail_ItemKey,
      ItemValue:this.detail_ItemValue,
      position:this.detail_position,
      isDefault:this.detail_isDefault
    }
    this.dataService.update_DictionaryDetail(update_DictionaryDetail).then(data=>{
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
        this.DictionaryDetail_visible = false;
      }else{
        this.message.create('error', data.error);
      }
    });
    
  }
//Drawer抽屉关闭
  close(): void {
    this.Dictionary_visible = false;
    this.DictionaryDetail_visible = false;
    this.AddDictionaryDetail_visible = false;
    this.Add_Dictionary_visible=false;
  }

  add_DictionaryDetail(){
    let add_DictionaryDetail={
      id:this.detail_id,
      DictionaryID:this.add_detail_DictionaryID,
      ItemKey:this.add_detail_ItemKey,
      ItemValue:this.add_detail_ItemValue,
      position:this.add_detail_position,
      isDefault:this.add_detail_isDefault
  }
  this.dataService.Add_DictionaryDetail(add_DictionaryDetail).then(data=>{
    // console.log(data);
    if(data.status=='success'){
      this.message.create('success', `子字典增加成功`);
      this.getdata(); 
      this.AddDictionaryDetail_visible = false;
    }else{
      this.message.create('error', data.error);
    }
  });
  

}
  delet_Dictionary(data_all){
    this.dataService.Delet_Dictionary(data_all.id).then(
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
  delet_DictionaryDetail(data_all){
    this.dataService.Delet_DictionaryDetail(data_all.id).then(
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

  add_Dictionary_open(){
    this.add_dictionary_code="";
    this.add_dictionary_desc="";
    this.Add_Dictionary_visible=true;
  }

  add_Dictionary(){
    let add_DictionaryDetail={
      code:this.add_dictionary_code,
      desc:this.add_dictionary_desc
    }
    this.dataService.Add_Dictionary(add_DictionaryDetail).then(
      data=>{
        // console.log(data);
        if(data.status=='success'){
          this.message.create('success', `添加成功`);
          this.getdata(); 
          this.Add_Dictionary_visible = false;
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
