import { Component, OnInit } from '@angular/core';
import {CourseOpService} from '../../service/course-op.service';
import{TeacherOpService} from '../../service/teacher-op.service';
import{DictionaryOpService} from '../../service/dictionary-op.service'
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-course-message-manage',
  templateUrl: './course-message-manage.component.html',
  styleUrls: ['./course-message-manage.component.css']
})
export class CourseMessageManageComponent implements OnInit {
  listOfData = [];
  all_data=[];
  TeachId_TeachName:any;
  dictionary_day:any;
  Course_visible = false;
  updata_Course_visible=false;
  add_teacher:any;

  //add_CourseID:any='';
  add_CourseName:any='';
  add_TeacherName:any='';
  add_stuobject:any='';
  add_CourseWeek:any='';
  add_CourseDay:any='';
  add_CourseTime:any='';
  add_CoursePlace:any='';
  add_School:any='';
 // add_Layout:any='';

  up_CourseId:any;
  up_CourseName:any='';
  up_TeacherName:any='';
  up_stuobject:any='';
  up_CourseWeek:any='';
  up_CourseDay:any='';
  up_CourseTime:any='';
  up_CoursePlace:any='';
  up_School:any='';
 // up_Layout:any='';

  constructor(private message: NzMessageService,private courseservice: CourseOpService,private teacherservice: TeacherOpService,private dictionService: DictionaryOpService) { }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    this.courseservice.get_corse().then(data=>{
      if(data.body.status=="error"){
        this.message.create('error', data.body.error);
      }else{
        this.listOfData=data.body.data;
        this.all_data=data.body.data;
      }
      // console.log(data.body.data);

    });
    this.dictionService.get_dictionary_detail(22).then(data=>{
      this.dictionary_day=data.body.data;
      // console.log(data.body.data);
    })
  }
  
  addCourseopen(): void {
    this.add_CourseName='';
    this.add_TeacherName='';
    this.add_stuobject='';
    this.add_CourseWeek='';
    this.add_CourseTime='';
    this.add_CoursePlace='';
    this.add_School='';
    //this.add_Layout='';
    this.Course_visible = true;
  }

  add_Course_function():void{
    let add_Course={
      add_CourseName:this.add_CourseName,
      add_TeacherName:this.add_TeacherName,
      add_stuobject:this.add_stuobject,
      add_CourseWeek:this.add_CourseWeek,
      add_CourseDay:this.add_CourseDay,
      add_CourseTime:this.add_CourseTime,
      add_CoursePlace:this.add_CoursePlace,
      add_School:this.add_School,
      //add_Layout:this.add_Layout
  }
this.courseservice.add_course(add_Course).then(data=>{
  if(data.status=='success'){
    this.message.create('success', `修改成功`);
    this.getdata();
    this.Course_visible = false;
  }else{
    this.message.create('error', data.error);
  }
});

  }


  up_Course_function(){
    let up_Course={
      CourseId:this.up_CourseId,
      CourseName:this.up_CourseName,
      TeacherName:this.up_TeacherName,
      stuobject:this.up_stuobject,

      CourseWeek:this.up_CourseWeek,
      CourseDay:this.up_CourseDay,
      CourseTime:this.up_CourseTime,
      CoursePlace:this.up_CoursePlace,
      School:this.up_School,
     // Layout:this.up_Layout
  }
  this.courseservice.up_course(up_Course).then(data=>{
    if(data.status=='success'){
      this.message.create('success', `修改成功`);
      this.getdata();
      this.updata_Course_visible = false;
    }else{
      this.message.create('error', data.error);
    }


  })
  }

  EditCourse(data){
    this.up_CourseId=data.CourseId;
    this.up_CourseName=data.CourseName;
    this.up_TeacherName=data.TeacherName;
    this.up_stuobject=data.stuobject;
    this.up_CourseWeek=data.CourseWeek;
    this.up_CourseDay=data.CourseDay;
    this.up_CourseTime=data.CourseTime;
    this.up_CoursePlace=data.CoursePlace;
    this.up_School=data.School;
    //this.up_Layout=data.Layout;
    this.updata_Course_visible= true;
  }

  delet_course(data){
    this.courseservice.delet_course(data).then(data=>{
      if(data.status=='success'){
        this.message.create('success', `删除成功`);
        this.getdata();
      }else{
        this.message.create('error', data.error);
      }

    })

  }

 close(): void {
    this.Course_visible = false;
    this.updata_Course_visible= false;

  }
}
