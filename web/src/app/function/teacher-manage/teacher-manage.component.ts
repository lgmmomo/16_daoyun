import { Component, OnInit } from '@angular/core';
import { TeacherInfoService } from 'src/app/service/teacher-info.service';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-manage',
  templateUrl: './teacher-manage.component.html',
  styleUrls: ['./teacher-manage.component.css']
})
export class TeacherManageComponent implements OnInit {


  add_visible:any;
  add_name :any;
  add_number:any;
  add_username:any;
  add_tel:any;

  edit_visible:any;
  edit_name:any;
  edit_number:any;
  
  searchUserbyNumber:any;
  all_data :any = [];
  
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any = [];
  listOfAllData: any = [];
  listOfAllData_temp: any = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  constructor(private teacherInfo: TeacherInfoService,public http: HttpClient,private message: NzMessageService,) { }

  ngOnInit() {
    this.getdata();
  }
  getdata():void{
    this.teacherInfo.getdata().then(data => {
      if(data.body.status=="error"){
        this.message.create('error', data.body.error);
      }else{
        this.listOfAllData = data.body.data;
      for(let i = 0; i < this.listOfAllData.length;i++)
        this.listOfAllData[i].disabled = false;
      this.listOfAllData_temp = this.listOfAllData;
      console.log(data.body.data);
      }
      
    });
  }
  deleteUser(data):void{
    this.teacherInfo.delete(data.Userid).then(data => {
      if(data.status=='success'){
        this.message.create('success', `删除成功`);
        this.getdata(); 
      }else{
        this.message.create('error', data.error);
      }
    })
  }
  UserDetail_insert():void{
    let insert= {
      'username':this.add_username,
      'tel':this.add_tel,
      'TeachName':this.add_name,
      'TeachNumber':this.add_number,
    }
    //console.log(insert);
    this.teacherInfo.insert(insert).then(data => {
      if(data.status=='success'){
        this.message.create('success', `新增成功`);
        this.getdata(); 
      }else{
        this.message.create('error', data.error);
      }
    });
    this.getdata();
  }


  EditUseropen(data){
    this.edit_visible = true;
    this.edit_name = data.TeachName;
    this.edit_number = data.TeachNumber;
  }
  EditUserclose(){
    this.edit_visible = false;
  }

  UserDetail_updata():void{
    let update = {
      'TeachName':this.edit_name,
      'TeachNumber':this.edit_number,
    }
    this.teacherInfo.update(update).then(data =>{
      if(data.status == 'success') {
        this.message.create('success', `修改成功`);
        this.getdata(); 
      }
      else{
        this.message.create('error', data.error);
      }
    });
    this.edit_visible = false;
  }


  addUseropen(){
    this.add_visible = true;
  }
  addUserclose(){
    this.add_visible = false;
  }
  currentPageDataChange($event: any): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.number]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.number]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.number]).length;
  }

  checkAll(value: boolean): void {
    console.log(this.listOfDisplayData);
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.number] = value));
    //console.log(this.mapOfCheckedId);
    this.refreshStatus();
  }
  // 批量删除用户



  SearchUser(){
    this.listOfAllData = [];
    if(this.searchUserbyNumber == '')
    {
      this.listOfAllData = this.listOfAllData_temp;
    }
    else{
      for(let i = 0; i < this.listOfAllData_temp.length; i++)
      {
        if(this.listOfAllData_temp[i]['TeachName'] == this.searchUserbyNumber || this.listOfAllData_temp[i]['TeachNumber'] == this.searchUserbyNumber)
          this.listOfAllData.push(this.listOfAllData_temp[i]);
        else{
          continue;
        }
      }

    }
  }
}
