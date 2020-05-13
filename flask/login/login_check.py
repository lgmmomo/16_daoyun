#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint,session
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import USER,MENU
import json

mod = Blueprint('login_check', __name__)

@mod.route('/login_check', methods=['POST'])
def dictionary_data():
    username_password=request.get_data()
    username_password=json.loads(username_password)
    # username_password {'username': 'admin', 'passcode': '827ccb0eea8a706c4c34a16891f84e7b', 'oneTimeCode': 1561814585774}
    user=USER.query.filter_by(Loginname=username_password['username']).first()
    if not user or user.Roleid==2 or user.Roleid==3:
        return jsonify({'status':'error','data':'','error':'用户不存在'})
    user_json=user.to_json()
    user=json.loads(user_json)
    if user['password']==username_password['passcode']:
        session.permanent=True
        session['username'] = username_password['username']
        return jsonify({'status':'success','data':{'username':username_password['username'],'role':user['roleid']},'error':''})
    else:
        return jsonify({'status':'error','data':'','error':'用户名错误或是密码错误'})

@mod.route('/menu/<int:roleid>', methods=['GET'])
def get_menu(roleid):
    if int(roleid) == 1:
        menus=MENU.query.all()
        menu_return=[]
        for menu in menus:
            menu=menu.to_json()
            menu=json.loads(menu)
            menu_return.append(menu)
    else:
        menus=MENU.query.filter_by(roleid=2).all()
        menu_return=[]
        for menu in menus:
            menu=menu.to_json()
            menu=json.loads(menu)
            menu_return.append(menu)
    return jsonify({'status':'success','data':menu_return,'error':''})


