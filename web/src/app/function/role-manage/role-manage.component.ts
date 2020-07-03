import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleinfoService } from 'src/app/service/roleinfo.service';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {

 
  searchRolebyNumber:any;
  allChecked = false;
  Role_statue: any;
  Role_description: any;
  Role_number: any;
  Role_name: any;

  edit_number :any;
  edit_name: any;
  edit_description: any;
  edit_statue: any;
  edit_visible = false;
  isVisible = false;

  total: number;
  indeterminate = true;
  checkOptionsOne : any = [];
  checkOptionsTwo : any = [];

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any = [];
  listOfAllData: any = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  listofallData_temp:any = []
  all_data:any[] =[];
  
  constructor(private roleinfo: RoleinfoService,private message: NzMessageService) { }
 
  ngOnInit() :void{
    this.getdata();
  }
  

    
  getdata():void {
    this.roleinfo.get_RoleInfo().then(data => {
      this.listOfAllData = data.body.data.filter(item => item.Roleid != 1 && item.Roleid != 2 && item.Roleid != 3); 
      for(let i = 0; i < this.listOfAllData.length; i++)
      {
        this.roleinfo.get_RightOfRole(this.listOfAllData[i].Roleid).then(data => {
          let rights = '';
          for(let j = 0 ; j < data.data.length; j++) 
            rights = rights + data.data[j].Rightid +'|';
          this.listOfAllData[i].rights = rights;
        });
        if(this.listOfAllData[i].Islock == 1)
          this.listOfAllData[i].statue = '正常';
        else
          this.listOfAllData[i].statue = '禁用';
        this.listOfAllData[i].disabled = false;
      }
      this.listofallData_temp = this.listOfAllData;
      this.total = this.listOfAllData.length;
    });
    this.getrights();
  }

  getrights():void{
    this.roleinfo.getRights().then(data => {
      let rights = data.body.data;
      this.checkOptionsOne = [];
      for(let i = 0 ;i < rights.length;i++)
      {
        this.checkOptionsOne.push({
          label:rights[i].Rightname,
          value:rights[i].Rightid,
          checked:false
        })
      }
      console.log(this.checkOptionsOne);
    });

  }

  showModal(): void {
    this.isVisible = true;
  }
  // 提交新增角色信息
  handleOk(): void {
    var RoleIsLock = 0;
    var RoleName = this.Role_name;
    var RoleDescription = this.Role_description;
    var RoleStatue = this.Role_statue;
    if(RoleStatue == '1')
      RoleIsLock = 1;
    else
      RoleIsLock = 0;
    let rightofRole = '';
    for(let i = 0 ; i < this.checkOptionsOne.length; i++)
    {
      if(this.checkOptionsOne[i].checked == true){
        rightofRole =  rightofRole +  this.checkOptionsOne[i].value  +'|';
      }
    }
    let RoleNew = {
      'Rolename':RoleName,
      'Roledescribe':RoleDescription,
      'Islock':RoleIsLock,
      'Rights':rightofRole
    }
    this.roleinfo.insertRoleInfo(RoleNew).then(data => {
      if(data.status == 'success') {
        this.message.create('success', `修改成功`);
        this.getdata(); 
      }
      else{
        this.message.create('error', data.error);
      }
    })
    this.isVisible = false;
  }
  
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.getrights();
  }

  EditRoleDetail(data):void{
    this.edit_name = data.Rolename;
    if(data.statue == '正常')
      this.edit_statue = '1';
    else
      this.edit_statue = '0';      
    this.edit_description = data.Roledescribe;
    this.checkOptionsTwo = this.checkOptionsOne;
    var rights = data.rights.split('|');
    for(let i = 0; i < rights.length; i++){
      if(rights[i] != ''){
        this.checkOptionsTwo[rights[i]-1].checked = true;
      }
      else{
        continue;
      }
    }
    this.edit_visible = true;
  }

  EditRoleclose():void{
    for(let i = 0 ; i <this.checkOptionsTwo.length; i++)
      this.checkOptionsTwo[i].checked = false;
    this.edit_visible = false;
  }

  Role_updata():void {
    var status = 0;
    var rights = '';
    if(this.edit_statue == '0')
      status = 0;
    else
      status = 1;
    for(let i = 0; i < this.checkOptionsTwo.length;i++)
    {
      if(this.checkOptionsTwo[i].checked == true)
        rights = rights + this.checkOptionsTwo[i].value + '|';
      else
        continue;
    }
    let updataInfo = {
      'Rolename':this.edit_name,
      'Roledescribe':this.edit_description,
      'Islock':status,
      'rights':rights    
    }
    this.roleinfo.updateInfo(updataInfo).then(data => {
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


  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsTwo = this.checkOptionsTwo.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsTwo = this.checkOptionsTwo.map(item => {
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
    let roleid = data.Roleid;
    //console.log(roleid);
    this.roleinfo.delete_single_role(roleid).then(data => {
      console.log(data);
      if(data.status=='success'){
        this.message.create('success', `删除成功`);
        this.getdata(); 
      }else{
        this.message.create('error', `删除失败`);
      }
    })
  }
  SearchRole():void{
    this.listOfAllData = [];
    // console.log(this.searchRolebyNumber);
    // console.log(this.listofallData_temp);
    // this.listOfAllData = this.listofallData_temp;
    // this.listOfAllData.filter(item => item.Rolename ==  this.searchRolebyNumber);
    if(this.searchRolebyNumber == '')
      this.listOfAllData = this.listofallData_temp;
    else{
      for(let i = 0 ; i < this.listofallData_temp.length ;i++)
      {
        if(this.listofallData_temp[i]['Rolename'] == this.searchRolebyNumber){
          this.listOfAllData.push(this.listofallData_temp[i]);
        }
        else{
          continue;
        }

      }
    }
  }

}
