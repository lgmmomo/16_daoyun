#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask_web import db
import json
from functools import wraps
from flask import Blueprint,session
from flask import jsonify,request
import datetime
def requires_login(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('username'):
            return jsonify({'status':'error','data':'','error':'你需要登录'})
        return f(*args, **kwargs)
    return decorated_function

class Dictionary(db.Model):
    __tablename__ = 'Dictionary'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    code = db.Column(db.String(16), unique=True)
    description = db.Column(db.String(256), unique=True)

    def __init__(self, code, description):
        self.code = code
        self.description = description

    def to_json(self):
        json_data={
            'id':self.id,
            'code':self.code,
            'desc':self.description
        }
        return json.dumps(json_data)

    def get_dictionary_detail(self):
        dictionary_detail=DictionaryDetail.query.filter_by(DictionaryID=self.id).order_by(DictionaryDetail.position.asc())
        all_data=[]
        for data in dictionary_detail:
            data=data.to_json()
            data=json.loads(data)
            all_data.append(data)
        return json.dumps(all_data)

class DictionaryDetail(db.Model):
    __tablename__ = 'DictionaryDetail'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    DictionaryID = db.Column(db.Integer,db.ForeignKey('Dictionary.id'))
    ItemValue = db.Column(db.String(32),nullable=False)
    position=db.Column(db.Integer,nullable=False)
    isDefault=db.Column(db.Integer,nullable=False)

    def __init__(self, DictionaryID, ItemValue,position,isDefault):
        self.DictionaryID = DictionaryID
        self.ItemValue = ItemValue
        self.position = position
        self.isDefault = isDefault

    def to_json(self):
        json_data={
            'id':self.id,
            'DictionaryID':self.DictionaryID,
            'ItemValue':self.ItemValue,
            'position':self.position,
            'isDefault':self.isDefault
        }
        return json.dumps(json_data)



class USER(db.Model):
    __tablename__ = 'User'
    Userid = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Loginname = db.Column(db.String(255), unique=True)
    tel=db.Column(db.Integer)
    password = db.Column(db.String(32), unique=True)
    Roleid = db.Column(db.Integer)

    def __init__(self,Loginname,tel,password,Roleid):
        self.Loginname = Loginname
        self.tel=tel
        self.password = password
        self.Roleid = Roleid 
    def to_json(self):
        json_data={
            'userid':self.Userid,
            'loginname':self.Loginname,
            'tel':self.tel,
            'password':self.password,
            'roleid':self.Roleid,
        }
        return json.dumps(json_data)


class STUDENT(db.Model):
    __tablename__ = 'Student'
    Studentid = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Studentname = db.Column(db.String(255))
    StudentNumber = db.Column(db.Integer, unique=True)
    Major = db.Column(db.String(255))
    Schooling = db.Column(db.String(255))
    Userid = db.Column(db.Integer, db.ForeignKey('User.Userid'))
    Class = db.Column(db.String(255))

    def __init__(self,Studentname, StudentNumber,Major,Schooling,Userid,Class):
        self.Studentname = Studentname
        self.StudentNumber = StudentNumber
        self.Major = Major
        self.Schooling = Schooling
        self.Userid = Userid
        self.Class = Class    

    def to_json(self):
        json_data={
            'Studentid':self.Studentid,
            'Studentname':self.Studentname,
            'StudentNumber':self.StudentNumber,
            'Major':self.Major,
            'Schooling':self.Schooling,
            'Userid':self.Userid,
            'Class':self.Class,
        }
        return json.dumps(json_data)





        
class MENU(db.Model):
    __tablename__ = 'Menu'
    Menuid = db.Column(db.Integer, primary_key=True,autoincrement=True)
    Menuname = db.Column(db.String(255), unique=True)
    URL = db.Column(db.String(255))
    icon = db.Column(db.String(255))
    roleid=db.Column(db.Integer)

    
    def to_json(self):
        json_data={
            'Menuid':self.Menuid,
            'text':self.Menuname,
            'link':self.URL,
            'icon':self.icon,
            'children':[]
        }
        return json.dumps(json_data)


class Course(db.Model):
    __tablename__='Course'
    CourseId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    CourseName = db.Column(db.String(255), unique=True)
    Teachername = db.Column(db.String(255))
    stuobject=db.Column(db.String(255))
    CourseWeek = db.Column(db.String(255)) #课程学时
    CourseDay=db.Column(db.String(255))#课程周序
    CourseTime=db.Column(db.String(255))#课程节次
    CoursePlace=db.Column(db.String(255))#课程地点
    School=db.Column(db.String(255))
    
    def __init__(self,CourseName,Teachername,stuobject,CourseWeek,CourseDay,CourseTime,CoursePlace,School):
        self.CourseName = CourseName
        self.Teachername = Teachername
        self.stuobject = stuobject
        self.CourseWeek = CourseWeek
        self.CourseDay = CourseDay
        self.CourseTime = CourseTime
        self.CoursePlace = CoursePlace  
        self.School = School

    def to_json(self):
        json_data={
            'CourseId':self.CourseId,
            'CourseName':self.CourseName,
            'TeacherName':self.Teachername,
            'stuobject':self.stuobject,
            'CourseWeek':self.CourseWeek,
            'CourseDay':self.CourseDay,
            'CourseTime':self.CourseTime,
            'CoursePlace':self.CoursePlace,
            'School':self.School
        }
        return json.dumps(json_data)
    


class Teacher(db.Model):
    __tablename__='Teacher'
    TeachId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    TeachName = db.Column(db.String(255), unique=True)
    TeachNumber = db.Column(db.Integer)
    Userid = db.Column(db.Integer,db.ForeignKey('User.Userid')) 

    def __init__(self,TeachName, TeachNumber, Userid):
        self.TeachName = TeachName
        self.TeachNumber = TeachNumber
        self.Userid = Userid 

    def to_json(self):
        json_data={
            'TeachId':self.TeachId,
            'TeachName':self.TeachName,
            'TeachNumber':self.TeachNumber,
            'Userid':self.Userid
        }
        return json.dumps(json_data)

    def get_TeachName_TeachNumber(self):
        return str(self.TeachName),str(self.TeachNumber)
   
    def get_TeachId(self):
        return int(self.TeachId)

class Role(db.Model):
    """docstring for Role"""
    __tablename__='Role'
    Roleid = db.Column(db.Integer,primary_key = True,autoincrement = True)
    Rolename = db.Column(db.String(255),unique=True)
    Roledescribe = db.Column(db.String(255))
    Islock = db.Column(db.Integer)
    def __init__(self, Rolename,Roledescribe,Islock):
        self.Rolename = Rolename
        self.Roledescribe = Roledescribe
        self.Islock = Islock
        
    def to_json(self):
        json_data={
            'Roleid':self.Roleid,
            'Rolename':self.Rolename,
            'Roledescribe':self.Roledescribe,
            'Islock':self.Islock,
        }
        return json.dumps(json_data)
        
class RoleRightRelation(db.Model):       
    __tablename__='RoleMeaurelation'
    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    Roleid = db.Column(db.Integer,db.ForeignKey('Role.Roleid'))   
    Rightid = db.Column(db.Integer,db.ForeignKey('Right.Rightid'))
    def __init__(self, Roleid,Rightid):
        self.Roleid = Roleid
        self.Rightid = Rightid
    def to_json(self):
        json_data = {
            'Roleid' :self.Roleid,
            'Rightid':self.Rightid,
        }
        return json.dumps(json_data)


class Right(db.Model):       
    __tablename__='Right'
    Rightid = db.Column(db.Integer,primary_key = True,autoincrement = True)
    Rightname = db.Column(db.String(255))
    Rightdescribe = db.Column(db.String(255))
    Menuid = db.Column(db.String(255),db.ForeignKey(MENU.Menuid))
    def __init__(self, Rightname,Rightdescribe,Menuid):
        self.Rightname = Rightname
        self.Rightdescribe = Rightdescribe
        self.Menuid = Menuid
    def to_json(self):
        json_data = {
            'Rightid' :self.Rightid,
            'Rightname':self.Rightname,
            'Rightdescribe' :self.Rightdescribe,
            'Menuid':self.Menuid,
        }
        return json.dumps(json_data)


class Course_Student(db.Model):
    __tablename__='Course_Student'
    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    CourseId = db.Column(db.Integer,db.ForeignKey(Course.CourseId))
    Studentid = db.Column(db.Integer,db.ForeignKey(STUDENT.Studentid))
    def __init__(self, CourseId,Studentid):
        self.CourseId = CourseId
        self.Studentid = Studentid

        
    def to_json(self):
        json_data={
            'CourseId':self.CourseId,
            'Studentid':self.Studentid,
        }
        return json.dumps(json_data)

class Course_Sign(db.Model):
    __tablename__='Course_Sign'
    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    SignId = db.Column(db.Integer,db.ForeignKey('Pos_SignData.SignId'))
    CourseId = db.Column(db.Integer,db.ForeignKey('Course.CourseId'))
    Studentid = db.Column(db.Integer,db.ForeignKey('Student.Studentid'))
    longitude=db.Column(db.Numeric)
    latitude=db.Column(db.Numeric)
    SignTime = db.Column(db.String(255))
    Status = db.Column(db.String(255))

    def __init__(self, SignId,CourseId,Studentid,longitude,latitude,Status):
        self.SignId = SignId
        self.CourseId = CourseId
        self.Studentid = Studentid
        self.longitude = longitude
        self.latitude = latitude
        self.Status = Status

        
    def to_json(self):
        json_data={
            'SignId':self.SignId,
            'CourseId':self.CourseId,
            'Studentid':self.Studentid,
            'longitude':self.longitude,
            'latitude':self.latitude,
            'SignTime':self.SignTime,
            'Status':self.Status,

        }
        return json.dumps(json_data)




class Pos_SignData(db.Model):
    __tablename__='Pos_SignData'
    SignId = db.Column(db.Integer,primary_key = True,autoincrement = True)
    CourseId = db.Column(db.Integer,db.ForeignKey('Course.CourseId'))
    password=db.Column(db.Integer)
    StartData = db.Column(db.DateTime)
    longitude=db.Column(db.Numeric)
    latitude=db.Column(db.Numeric)


    def __init__(self, CourseId,password,StartData,longitude,latitude):
        self.CourseId = CourseId
        self.password = password
        self.StartData = StartData
        self.longitude = longitude
        self.latitude = latitude


    def to_json(self):
        json_data={
            'SignId':self.SignId,
            'CourseId':self.CourseId,
            'password':self.password,
            'StartData':self.StartData,
            'longitude':self.longitude,
            'latitude':self.latitude
        }
        return json.dumps(json_data)


class OPmenu(db.Model):
    __tablename__ = 'OPmenu'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    code = db.Column(db.String(16), unique=True)
    description = db.Column(db.String(256), unique=True)

    def __init__(self, code, description):
        self.code = code
        self.description = description

    def to_json(self):
        json_data={
            'id':self.id,
            'code':self.code,
            'desc':self.description
        }
        return json.dumps(json_data)

    def get_opmenu_detail(self):
        opmenu_detail=MenuDetail.query.filter_by(MenuDetailID=self.id).order_by(MenuDetail.position.asc())
        all_data=[]
        for data in opmenu_detail:
            data=data.to_json()
            data=json.loads(data)
            all_data.append(data)
        return json.dumps(all_data)

class MenuDetail(db.Model):
    __tablename__ = 'MenuDetail'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    MenuDetailID = db.Column(db.Integer,db.ForeignKey('OPmenu.id'))
    ItemValue = db.Column(db.String(32),nullable=False)
    position=db.Column(db.Integer,nullable=False)
    isDefault=db.Column(db.Integer,nullable=False)

    def __init__(self, MenuDetailID, ItemValue,position,isDefault):
        self.MenuDetailID = MenuDetailID
        self.ItemValue = ItemValue
        self.position = position
        self.isDefault = isDefault

    def to_json(self):
        json_data={
            'id':self.id,
            'MenuDetailID':self.MenuDetailID,
            'ItemValue':self.ItemValue,
            'position':self.position,
            'isDefault':self.isDefault
        }
        return json.dumps(json_data)
