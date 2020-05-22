import { Component, OnInit } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.page.html',
  styleUrls: ['./new-class.page.scss'],
})
export class NewClassPage implements OnInit {

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private router: Router) {}

  new_class_url=''; //新建课程信息的api
  submited = false;
  signup = {
    subject: '',
    school: '',
    term:'',
    classroom: '',
    start_time:'',
    end_time:'',
    object: '', 
    start_week:'',
    end_week: '', 
    submited: false  //用来表示表单是否提交过
  }

  ngOnInit() {
  }

  onSignupIformation(form: NgForm) {
    this.signup.submited = true //表单提交
    if (form.valid) {
      this.onSignupSave()
    }
  }
  onSignupSave() {
    let subjectInfo: any = {} //新建课程的信息
    subjectInfo['subject'] = this.signup.subject
    subjectInfo['school'] = this.signup.school
    subjectInfo['term'] = this.signup.term
    subjectInfo['classroom'] = this.signup.classroom
    subjectInfo['start_time'] = this.signup.start_time
    subjectInfo['end_time'] = this.signup.end_time
    subjectInfo['object'] = this.signup.object
    subjectInfo['start_week'] = this.signup.start_week
    subjectInfo['end_week'] = this.signup.end_week
    let loginUser = this.localStorageService.get('login', null);
    subjectInfo['teacherName'] = loginUser.name;
    subjectInfo['teacherId'] = loginUser.userNo;
    subjectInfo['submitTime'] = new Date().toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    subjectInfo['submitPerson'] = loginUser.userNo;
    let subjectInfo_json=JSON.stringify(subjectInfo);
    console.log('新建课程信息：', subjectInfo_json);
    this.commonService.postData(this.new_class_url, subjectInfo_json).then((response)=>{
      console.log('新建课程成功!', response);
      let course_id='123';
      this.router.navigate(['/qrcode'],{
        queryParams:{
          course_id: course_id,
          course_name: this.signup.subject
        }
      })
    }).catch((error)=>{
      console.log('新建课程失败', error);
    })
    // this.userService.signupSubject(subjectInfo);
  }

  onBack(){
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }

}
