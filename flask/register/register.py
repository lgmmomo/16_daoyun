from flask_web import app
from flask import Blueprint,session
from flask_web import db
from flask import jsonify,request
from flask_web.databaseModel import Teacher,USER,STUDENT
import json
mod = Blueprint('register', __name__)

@app.route('/register/student',methods=['PUT'])
def register_student():
    register_data = request.get_data()
    register_data = json.loads(register_data)
    loginname = register_data['studentnumber']
    password = register_data['password']
    roleid = register_data['roleid']

    studentname = '默认用户'
    studentname=register_data['studentname']
    studentnumber = register_data['studentnumber']
    major = register_data['major']
    schooling = register_data['schooling']
    studentclass = register_data['studentclass']
    #telephone = register_data['telephone']
    new_user = USER(loginname,password,roleid)
    db.session.add(new_user)
    db.session.commit()
    studentid=new_user.Userid
    new_student = STUDENT(studentname,studentnumber,major,schooling,studentid,studentclass)
   # db.session.add(new_user)
    db.session.add(new_student)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@app.route('/register/teacher',methods=['PUT'])
def regist_teacher():
    register_data = request.get_data()
    register_data = json.loads(register_data)
    loginname = register_data['teachernumber']
    password = register_data['password']
    roleid = register_data['roleid']

    teachername = register_data['teachername']
    teachernumber = register_data['teachernumber']
    new_user = USER(loginname,password,roleid)
    db.session.add(new_user)
    db.session.commit()
    teacherid=new_user.Userid
    new_teacher = Teacher(teachername,teachernumber,teacherid)
    db.session.add(new_teacher)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})