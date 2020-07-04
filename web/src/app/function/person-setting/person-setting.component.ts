import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/service/user-info.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-person-setting',
  templateUrl: './person-setting.component.html',
  styleUrls: ['./person-setting.component.css']
})
export class PersonSettingComponent implements OnInit {




  searchUserbyNumber:any;
  allChecked = false;
  add_loginname :any;
  add_role:any;
  add_tel:any;

  edit_userid:any;
  edit_loginname :any;
  edit_role:any;
  edit_visible = false;
  add_visible = false;

  total: number;

  indeterminate = true;
  checkOptionsOne : any = [];
  checkOptionsTwo : any = [];

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any = [];
  listOfAllData: any = [];
  listofAllData_temp: any = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  isshow:any;
  rolelist:any = [];

  constructor(private userInfo: UserInfoService,private message: NzMessageService) { }
 
  ngOnInit() :void{
    this.getdata();
  }
  getdata():any {
    this.userInfo.getUserData().then(data => {
      this.listOfAllData = data.body.data.filter(item => item.roleid != 1);
      console.log(this.listOfAllData);
      for(let i = 0; i < this.listOfAllData.length;i++)
        this.listOfAllData[i].disabled = false;
      this.listofAllData_temp = this.listOfAllData;
    });
    this.userInfo.getRoleData().then(data => {
      console.log(data.body.data);
      this.rolelist = data.body.data.filter(item => item.Roleid != 1 && item.Roleid != 2 && item.Roleid != 3);
      for(let i = 0 ; i < this.rolelist.length ; i++)
      {
        if(this.rolelist[i].Islock == 1)
          this.rolelist[i].Disabled = false;
        else
          this.rolelist[i].Disabled = true;
      }
    });
  }
    // 打开新增用户抽屉
    addUseropen():void{
      this.add_visible = true;
    }
    // 打开用户信息编辑抽屉
    EditUseropen(data): void {
      //console.log(data.roleid);
      this.edit_loginname = data.loginname;
      this.edit_userid = data.userid
      //this.edit_role = data.roleid;
      switch (data.roleid) {
        case 2:
          this.isshow = true;
          this.edit_role = '教师';
          break;
        case 3:
          this.isshow = true;
          this.edit_role = '学生';
          break;
        default:
          this.isshow = false;
          this.edit_role = data.roleid;
          break;
      }   

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
    updataUser(){
      let updata = {
        //'Loginname':this.edit_loginname,
        'Userid':this.edit_userid,
        'Roleid':this.edit_role,
      }
      this.userInfo.updateInfo(updata).then(data =>{
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
    UserDetail_insert(){
      let insert = {
        'tel':this.add_tel,
        'Loginname':this.add_loginname,
        'Roleid':this.add_role,
      }
      console.log(insert);
      this.userInfo.insertUserInfo(insert).then(data => {
        if(data.status == 'success') {
          this.message.create('success', `添加成功`);
          this.getdata(); 
        }
        else{
          this.message.create('error', data.error);
        }
      });
      this.add_visible = false;
    }
    deleteUser(data){
      this.userInfo.deleteInfo(data.userid).then(data => {
        if(data.status == 'success') {
          this.message.create('success', `删除成功`);
          this.getdata(); 
        }
        else{
          this.message.create('error', data.error);
        }
      });

    }








  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
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
  // 批量删除角色
  batchDelete():void {
    //console.log(this.mapOfCheckedId);
    let batchofRole: String ='';
    for(let key in this.mapOfCheckedId){
      if(this.mapOfCheckedId[key] == true)
        key = key + '|';
        batchofRole += key ;
    }
    console.log(batchofRole);
  }
  // 删除单个角色操作
  deleteRole(data):void {
    let roleid = data.number;
    console.log(roleid);
  }
  SearchRole():void{
    console.log(this.searchUserbyNumber);
  }

  // 重置密码
  resetPSW(data):void {
    this.userInfo.resetPSW(data).then(data =>{
      if(data.status == 'success') {
        this.message.create('success', `重置成功`);
        this.getdata(); 
      }
      else{
        this.message.create('error', data.error);
      }  
    });

  }
  SearchUser(){
    console.log(this.listofAllData_temp);
    this.listOfAllData = [];
    if(this.searchUserbyNumber == '')
      this.listOfAllData = this.listofAllData_temp;
    else{
      for(let i = 0; i < this.listofAllData_temp.length; i++)
      {
        if(this.listofAllData_temp[i]['loginname'] == this.searchUserbyNumber)
          this.listOfAllData.push(this.listofAllData_temp[i]);
        else{
          continue;
        }
      }
    }
  }
 
 
}

