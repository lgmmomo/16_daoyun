import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentinfoService } from 'src/app/service/studentinfo.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DictionaryOpService } from 'src/app/service/dictionary-op.service';

@Component({
  selector: 'app-user-message-manage',
  templateUrl: './user-message-manage.component.html',
  styleUrls: ['./user-message-manage.component.css']
})
export class UserMessageManageComponent implements OnInit {
  searchUserbyNumber:any;
  all_data :any = [];
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any = [];
  listOfAllData: any = [];
  listofallData_temp:any =[];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  edit_number :any;
  edit_name: any;
  edit_class: any;
  edit_major: any;
  edit_schooling: any;
  add_number :any;
  add_name: any;
  add_class: any;
  add_major: any;
  add_schooling: any;
  edit_visible = false;
  add_visible = false;
  total:any
  //RoleOptionList = [{ label: '学生', value: 'student'}, { label: '教师',value :'teacher'},{label:'管理员',value:'admin'}];
  SchoolingList :any = [];
  constructor(private studentinfo: StudentinfoService, public http: HttpClient,private message: NzMessageService,private dictionary: DictionaryOpService ) { }
  
  ngOnInit() {
    this.getdata();
  }
  // 展示数据
  getdata():any {

    this.studentinfo.get_StudentInfo().then(data =>{
      if(data.body.status=="error"){
        this.message.create('error', data.body.error);
      }else{
      this.listOfAllData =  data.body.data;
      console.log(this.listOfAllData);
      for(let i = 0; i < this.listOfAllData.length;i++)
        this.listOfAllData[i].disabled = false;
      this.listofallData_temp = this.listOfAllData;
      this.total = this.listOfAllData.length;
      }
    });
    // 载入角色字典
    this.dictionary.get_dictionary_detail(9).then(data =>{
      //console.log(data);
      let List = data.body.data;
      for(let i = 0 ; i < List.length;i++){
        if(List[i].isDefault == 1 )
          this.add_schooling = List[i].ItemValue;
        this.SchoolingList.push({
          label:List[i].ItemValue,
          value:List[i].ItemValue
        })
      } 
    });
  }
  // 打开新增学生抽屉
  addUseropen():void{
    this.add_visible = true;
  }
  // 打开学生信息编辑抽屉
  EditUseropen(data): void {
    this.edit_name = data.Studentname;
    this.edit_number = data.StudentNumber;
    this.edit_schooling = data.Schooling;
    this.edit_class = data.Class;
    this.edit_major = data.Major;
    this.edit_visible = true;
  }
  // 编辑抽屉关闭
  EditUserclose(){
    this.edit_visible = false;
  }
  // 添加抽屉关闭
  addUserclose(){
    this.add_visible = false;
  }
  // 修改信息提交
  UserDetail_updata(){
    let updateInfo = {
      Major:this.edit_major,
      StudentNumber:this.edit_number,
      Studentname:this.edit_name,
      Schooling:this.edit_schooling,
      Class:this.edit_class
    }
    this.studentinfo.update_Student(updateInfo).then(data => {
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
  // 新增用户提交
  UserDetail_insert(){
    let NewStu={
      Major:this.add_major,
      StudentNumber:this.add_number,
      Studentname:this.add_name,
      Schooling:this.add_schooling,
      Class:this.add_class
  }
  this.studentinfo.Add_Student(NewStu).then(data=>{
    if(data.status=='success'){
      this.message.create('success', `新增成功`);
      this.getdata(); 
    }else{
      this.message.create('error', data.error);
    }
  });
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
  batchDelete():void {
    //console.log(this.mapOfCheckedId);
    let batchofUser: String ='';
    for(let key in this.mapOfCheckedId){
      if(this.mapOfCheckedId[key] == true)
        key = key + '|';
        batchofUser += key ;
    }
    console.log(batchofUser);
  }
  // 删除单个用户操作
  deleteUser(data):void {
    this.studentinfo.delete_single_stu(data.StudentNumber).then(data=>{
      if(data.status=='success'){
        this.message.create('success', `删除成功`);
        this.getdata(); 
      }else{
        this.message.create('error', data.error);
      }
    });
    //console.log(stuid);
  }

  SearchUser():void{
    //console.log(this.searchUserbyNumber);
    //console.log(this.listofallData_temp);
    this.listOfAllData = [];
    if(this.searchUserbyNumber == '')
      this.listOfAllData = this.listofallData_temp;
    else{
      for(let i = 0; i < this.listofallData_temp.length; i++){
        if(this.listofallData_temp[i]['Studentname'] == this.searchUserbyNumber || this.listofallData_temp[i]['StudentNumber'] == this.searchUserbyNumber){
          //console.log(this.listofallData_temp[i]);
          this.listOfAllData.push(this.listofallData_temp[i]);
        }
        else{
          continue;
        }

      }
    }

  }
}
