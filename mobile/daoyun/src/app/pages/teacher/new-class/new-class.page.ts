import { Component, OnInit } from '@angular/core';
import { AuthenticationCodeService } from 'src/app/shared/services/authentication-code.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.page.html',
  styleUrls: ['./new-class.page.scss'],
})
export class NewClassPage implements OnInit {

  constructor(
    private authenticationCode: AuthenticationCodeService,
    private userService: UserService,
    private alertController: AlertController,
    private localStorageService: LocalStorageService
  ) {}

  submited = false
  signup = {
    subject: '',
    school: '',
    term:'',//真实姓名
    classroom: '',//学校
    time:'',//专业
    object: '', //班级(先手动输入，后面有需求再改成下拉框)
    start_week:'',//学生、老师
    end_week: '', //学号、工号
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
    subjectInfo['time'] = this.signup.time
    subjectInfo['object'] = this.signup.object
    subjectInfo['start_week'] = this.signup.start_week
    subjectInfo['end_week'] = this.signup.end_week
    let loginUser = this.localStorageService.get('login', null);
    subjectInfo['teacherName'] = loginUser.name;
    subjectInfo['teacherId'] = loginUser.userNo;
    subjectInfo['submitTime'] = new Date().toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    subjectInfo['submitPerson'] = loginUser.userNo;
    this.userService.signupSubject(subjectInfo);
  }

}
