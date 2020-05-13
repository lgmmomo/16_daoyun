#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Teacher,USER,check_role
import json


mod = Blueprint('teacher', __name__)


@mod.route('/teach', methods=['GET'])
@check_role(8)
def get_teacher():
    teachers=Teacher.query.all()
    return_data=[]
    for teacher in teachers:
        teacher=teacher.to_json()
        teacher=json.loads(teacher)
        return_data.append(teacher)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/teacher/insert', methods=['POST'])
@check_role(5)
def add_student():
	add_data = request.get_data()
	add_data = json.loads(add_data)
	print(add_data)
	count = USER.query.filter_by(Loginname = add_data['TeachNumber']).count()
	if(count):
		return jsonify({'status':'error','data':'','error':'老师已存在'})
	t = USER(add_data['TeachNumber'],"e10adc3949ba59abbe56e057f20f883e",2)
	#'hashlib.md5('123456'.encode('utf-8')).hexdigest()'
	db.session.add(t)
	db.session.commit()
	userid = USER.query.filter_by(Loginname = add_data['TeachNumber']).first().Userid
	print(userid)
	teacher = Teacher(add_data['TeachName'],add_data['TeachNumber'],userid)
	db.session.add(teacher)
	db.session.commit()
	return jsonify({'status':'success','data':'','error':''})

@mod.route('/teacher/delete/<int:id>', methods=['DELETE'])
@check_role(6)
def delete_teacher(id):
	print(id)
	try:
		user = USER.query.filter_by(Loginname = id).first()
		db.session.delete(user)
		db.session.commit()
		try:
			t = Teacher.query.filter_by(TeachNumber = id).first()
			db.session.delete(t)
			db.session.commit()
		except:
			db.session.rollback()
			return jsonify({'status':'error','data':'','error':'删除失败'})
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'删除失败'})
	return jsonify({'status':'success','data':'','error':''})

@mod.route('/teacher/updataInfo', methods=['PUT'])
@check_role(7)
def update_student():
	up_data = request.get_data()
	up_data = json.loads(up_data)
	t = Teacher.query.filter_by(TeachNumber = up_data['TeachNumber']).first()
	try:
		t.TeachName = up_data['TeachName']
		db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'更新老师信息错误'})
	return jsonify({'status':'success','data':'','error':''})






