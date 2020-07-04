#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint,session
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Course,Teacher,USER,MENU,STUDENT,Course_Student,Pos_SignData,Course_Sign
import json
import time
import datetime
import sys
import importlib
importlib.reload(sys)
from geopy.distance import geodesic
#reload(sys)
#sys.setdefaultencoding('utf8')
mod = Blueprint('app_student_op', __name__)

@mod.route('/app/student/login_check', methods=['post'])
def login_check_student():
    username_password=request.get_data()
    username_password=json.loads(username_password)
    # print(username_password)
    # {u'password': u'123', u'id': u'123'}
    if username_password['flag']=='1':
        user=USER.query.filter_by(Loginname=str(username_password['username'])).first()
    else:
        user=USER.query.filter_by(tel=username_password['tel']).first()
    if not user:
        return jsonify({'state':'0','error':''})
    user_json=user.to_json()
    user=json.loads(user_json)
    # print(user['roleid'])
    if not user['roleid']==3:
        return jsonify({'state':'0','error':''})
    if user['password']==username_password['password']:
        return jsonify({'state':'1','error':''})
    return jsonify({'state':'2','error':''})

@mod.route('/app/student/<int:StudentNumber>', methods=['get'])
def get_name(StudentNumber):
	# print(StudentNumber)
	student=STUDENT.query.filter_by(StudentNumber = StudentNumber).first()
	return jsonify({'personnel':{'Pname':student.Studentname,'ID':StudentNumber,'Studentid':student.Studentid}})

@mod.route('/app/student_course/<int:StudentNumber>', methods=['get'])
def get_course(StudentNumber):
    return_data=[]
    # print(StudentNumber)
    student=STUDENT.query.filter_by(StudentNumber = StudentNumber).first()
    id=student.Studentid
    # print(id)
    course_ids=Course_Student.query.filter_by(Studentid=id).all()
    for course_id in course_ids:
        # print(course_id.CourseId)
        course_data=Course.query.filter_by(CourseId=int(course_id.CourseId)).first()
        course_data=course_data.to_json()
        course_data=json.loads(course_data)
        # print(course_data)
        a={'cnameAndID':{'courseID':course_data['CourseId'] }}
        a['cnameAndID']['courseName']=course_data['CourseName']
        a['cnameAndID']['stuobject']=course_data['stuobject']
        a['cnameAndID']['Teachername']=course_data['TeacherName']
        # print(a)
        a['cnameAndID']['CoursePlace']=course_data['CoursePlace']
        return_data.append(a)
    # print(return_data)
    return jsonify({'marks':return_data,'data':'','error':''})





@mod.route('/app/student/change_pass', methods=['put'])
def change_pass():
    up_data=request.get_data()
    up_data=json.loads(up_data)
    user_data=USER.query.filter_by(Loginname=up_data['loginname']).first()
    user_data.password=up_data['password']
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/app/student/kaoqin/<int:studentid>', methods=['get'])
def get_kaoqin(studentid):
    return_data=[]
    course_ids=Course_Student.query.filter_by(Studentid=studentid).all()
    for course in course_ids:
        a={}
        course_id=course.CourseId
        course_data=Course.query.filter_by(CourseId=course_id).first()
        a['coursename']=course_data.CourseName
        a['ok']=0
        a['later']=0
        a['no']=0
        sign_datas=Course_Sign.query.filter_by(CourseId=course_id,Studentid=studentid).all()
        for sign in sign_datas:
            print(sign.get_Status())
            if sign.Status.decode("utf-8") == "签到":
                a['ok']+=1
            if sign.Status.decode("utf-8") == "迟到":
                a['later']+=1
            if sign.Status.decode("utf-8") == "旷课":
                a['no']+=1
        return_data.append(a)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/app/student/nocourse/<int:studentid>', methods=['get'])
def get_nocourse(studentid):
    courses=Course.query.all()
    return_data=[]
    for course in courses:
        course_id=course.CourseId
        data=Course_Student.query.filter_by(Studentid=studentid,CourseId=course_id).first()
        if not data:
            a={}
            a['coursename']=course.CourseName
            a['courseid']=course.CourseId
            #teacher_id=course.TeachId
            #teacher=Teacher.query.filter_by(TeachId = teacher_id).first()
            a['teachername']=course.Teachername
            a['CourseWeek']=course.CourseWeek
            a['CourseDay']=course.CourseDay
            a['CourseTime']=course.CourseTime
            a['CoursePlace']=course.CoursePlace
            return_data.append(a)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/app/student/add_course/<int:courseid>', methods=['post'])
def add_course(courseid):
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # {'studentid':studentid}
    # print(add_data)
    add=Course_Student(courseid,add_data['studentid'])
    db.session.add(add)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/app/student/pos_sign/',methods=['put'])
def sign_status():
    sign_data=request.get_data()
    sign_data=json.loads(sign_data)
    signpassword=sign_data['signpassword']
    CourseId=sign_data['courseID']
    longitude=sign_data['longitude']
    latitude=sign_data['latitude']
    Sign=Pos_SignData.query.filter_by(CourseId=sign_data['courseID']).order_by(Pos_SignData.StartData.desc()).first()
    if not Sign:
        return jsonify({'status':'0','data':'','error':'当前课程尚未有老师未发起签到'})
    sign_id=Sign.SignId
    sign_start_time=Sign.StartData
    sign_start_time=datetime.datetime.strptime(sign_start_time,"%Y-%m-%d %H:%M:%S")
    sign_time=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    sign_time=datetime.datetime.strptime(sign_time,"%Y-%m-%d %H:%M:%S")
    timeout=sign_time-sign_start_time
    seconds=timeout.seconds
    if seconds>3600:
        return jsonify({'status':'1','data':'','error':'当前时间段课程无签到'})
    student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Studentid=sign_data['Studentid']).first()
    if student_sign.Status=='签到' or student_sign.Status=='迟到':
        return jsonify({'status':'2','data':'','error':'你已签到,请勿重复签到'})
    Signpassword=Sign.password
    if signpassword!=Signpassword:
        return jsonify({'status':'3','data':'','error':'签到手势错误，签到失败'})
    t_long=Sign.longitude
    t_lat=Sign.latitude
    distance=geodesic((latitude,longitude), (t_lat,t_long)).m
    #print(distance)
    if distance<200:
        student_sign=Course_Sign.query.filter_by(SignId=sign_id,CourseId=sign_data['courseID'],Studentid=sign_data['Studentid']).first()
        student_sign.SignTime=sign_time
        student_sign.longitude=longitude
        student_sign.latitude=latitude
        if seconds<180:
            student_sign.Status="签到"
            db.session.commit()
            return jsonify({'status':'6','error':'签到成功！'})
        elif seconds>180 and seconds<3600:
            student_sign.Status="迟到"
            db.session.commit()
            return jsonify({'status':'5','error':'签到成功，但已迟到'})
    else:
        return jsonify({'status':'4','error':'与签到距离过远'})
@mod.route('/app/get_student_info/<int:StudentNumber>', methods=['get'])
def get_student_name(StudentNumber):
	# print(StudentNumber)
	stu=STUDENT.query.filter_by(StudentNumber = StudentNumber).first()
	return jsonify({'personnel':{'name':stu.Studentname,'roleid':3,'Major':stu.Major,'School':stu.Schooling,'Class':stu.Class}})

@mod.route('/app/query_stuuser', methods=['post'])
def get_studentnum():
    stu_acc=request.get_data()
    stu_acc=json.loads(stu_acc)
    if stu_acc['flag']=='1':
        user=USER.query.filter_by(Loginname=str(stu_acc['username'])).first()
    else: 
        user=USER.query.filter_by(tel=stu_acc['tel']).first()
    userid=user.Userid
    stu=STUDENT.query.filter_by(Userid = userid).first()
    return jsonify({'studentnum':stu.StudentNumber,'userinfo':user.Loginname,'usertel':user.tel})
