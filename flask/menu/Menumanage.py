#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import OPmenu,MenuDetail
import json


mod = Blueprint('/menu', __name__)
@mod.route('/menu', methods=['GET'])
def menu_data():
    cmenu=OPmenu.query.all()
    return_data=[]
    for data in cmenu:
        data_json=data.to_json()
        cmenu_detail=data.get_opmenu_detail()
        data=json.loads(data_json)
        cmenu_detail=json.loads(cmenu_detail)
        data['childen']=cmenu_detail
        return_data.append(data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/Menu/<int:OPmenuId>', methods=['PUT'])
def updata_menudata(OPmenuId):
    up_data=request.get_data()
    up_data=json.loads(up_data)
    # up_data={'id':'','code':[], 'desc':''}
    menu=OPmenu.query.filter_by(id=up_data['id']).first()
    try:
        menu.code=up_data['code']
        menu.description=up_data['desc']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'菜单名已存在'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/MenuDetail/<int:MenuDetailID>', methods=['PUT'])
def updata_dictionart_detail(MenuDetailID):
    up_data=request.get_data()
    up_data=json.loads(up_data)
    if up_data['isDefault'] not in ['0','1']:
        return jsonify({'status':'error','data':'','error':'isDefault的值应为0或1'})
    menu_detail=MenuDetail.query.filter_by(id=up_data['id']).first()
    if not menu_detail.ItemValue==up_data['ItemValue']:
        count=MenuDetail.query.filter_by(MenuDetailID=up_data['MenuDetailID'],ItemValue=up_data['ItemValue']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'ItemValue重复'})
    if not menu_detail.position==up_data['position']:
        count=MenuDetail.query.filter_by(MenuDetailID=up_data['MenuDetailID'],position=up_data['position']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'position重复'})
    if not int(menu_detail.isDefault) == int(up_data['isDefault']):
        if(int(up_data['isDefault']) == 1):
            count=MenuDetail.query.filter_by(MenuDetailID=up_data['MenuDetailID'],isDefault=up_data['isDefault']).first()
            if(count):
                return jsonify({'status':'error','data':'','error':'isDefault重复'})
    try:
        menu_detail.ItemValue=up_data['ItemValue']
        menu_detail.position=up_data['position']
        menu_detail.isDefault=up_data['isDefault']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'更新子字典错误'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/menu/Menu', methods=['POST'])
def add_firstmenu():
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # add_data={'code': '1', 'desc': '1'}
    count=OPmenu.query.filter_by(code=add_data['code']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'字典名已存在'})
    newmenu=OPmenu(add_data['code'],add_data['desc'])
    db.session.add(newmenu)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/menu/MenuDetail', methods=['POST'])
#@check_role(13)
def add_MenuDe_tail():
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # add_data={'DictionaryID': 1, 'ItemKey': '1', 'ItemValue': '1', 'position': '1', 'isDefault': '1'}
    if add_data['isDefault'] not in ['0','1']:
        return jsonify({'status':'error','data':'','error':'isDefault的值应为0或1'})
    # count=DictionaryDetail.query.filter_by(DictionaryID=add_data['DictionaryID'],ItemKey=add_data['ItemKey']).first()
    # if(count):
    #     return jsonify({'status':'error','data':'','error':'ItemKey重复'})
    count=MenuDetail.query.filter_by(MenuDetailID=add_data['MenuDetailID'],ItemValue=add_data['ItemValue']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'ItemValue重复'})
    count=MenuDetail.query.filter_by(MenuDetailID=add_data['MenuDetailID'],position=add_data['position']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'position重复'})
    if(int(add_data['isDefault']) == 1):
        count=MenuDetail.query.filter_by(MenuDetailID=add_data['MenuDetailID'],isDefault=add_data['isDefault']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'isDefault重复'})
    menu_detail=MenuDetail(add_data['MenuDetailID'],add_data['ItemValue'],add_data['position'],add_data['isDefault'])
    db.session.add(menu_detail)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/menu/MenuDetail/<int:menu_detail_id>', methods=['DELETE'])
def delet_dictionary_detail(menu_detail_id):
    try:
        menu_detail=MenuDetail.query.filter_by(id=menu_detail_id).first()
        db.session.delete(menu_detail)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'删除失败'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/menu/Menu/<int:Menu_id>', methods=['DELETE'])
def delet_menufirst(Menu_id):
    try:
        menu_detail=MenuDetail.query.filter_by(MenuDetailID=Menu_id).all()
        # print(dictionary_detail)
        for data in menu_detail:
            db.session.delete(data)
        firstmenu=OPmenu.query.filter_by(id=Menu_id).first()
        db.session.delete(firstmenu)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'删除失败'})
    return jsonify({'status':'success','data':'','error':''})
