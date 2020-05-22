#!/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Dictionary,DictionaryDetail,check_role
import json

# status={
#     'status':'',
#     'data':[],
#     'error':''
# }
mod = Blueprint('dictionary', __name__)

@mod.route('/dictionary', methods=['GET'])
@check_role(16)
def dictionary_data():
    dictionary=Dictionary.query.all()
    return_data=[]
    for data in dictionary:
        data_json=data.to_json()
        dictionary_detail=data.get_dictionary_detail()
        data=json.loads(data_json)
        dictionary_detail=json.loads(dictionary_detail)
        data['childen']=dictionary_detail
        return_data.append(data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/dictionary_detail/<int:DictionaryId>', methods=['GET'])
@check_role(16)
def get_dictionary_detail(DictionaryId):
    dictionary_details=DictionaryDetail.query.filter_by(DictionaryID=DictionaryId)
    return_data=[]
    for dictionary_detail in dictionary_details:
        dictionary_detail=dictionary_detail.to_json()
        dictionary_detail=json.loads(dictionary_detail)
        return_data.append(dictionary_detail)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/dictionary/Dictionary/<int:DictionaryId>', methods=['PUT'])
@check_role(15)
def updata_dictionary(DictionaryId):
    up_data=request.get_data()
    up_data=json.loads(up_data)
    # up_data={'id':'','code':[], 'desc':''}
    dictionary=Dictionary.query.filter_by(id=up_data['id']).first()
    try:
        dictionary.code=up_data['code']
        dictionary.description=up_data['desc']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'字典名已存在'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/dictionary/DictionaryDetail/<int:DictionaryId>', methods=['PUT'])
@check_role(15)
def updata_dictionart_detail(DictionaryId):
    up_data=request.get_data()
    up_data=json.loads(up_data)
    # up_data={'id': 1,'DictionaryID': 1,  'ItemKey': 1, 'ItemValue': '管理员', 'position': 1, 'isDefault': '0'}
    if up_data['isDefault'] not in ['0','1']:
        return jsonify({'status':'error','data':'','error':'isDefault的值应为0或1'})
    dictionary_detail=DictionaryDetail.query.filter_by(id=up_data['id']).first()
    # if not dictionary_detail.ItemKey==up_data['ItemKey']:
    #     count=DictionaryDetail.query.filter_by(DictionaryID=up_data['DictionaryID'],ItemKey=up_data['ItemKey']).first()
    #     if(count):
    #         return jsonify({'status':'error','data':'','error':'ItemKey重复'})
    if not dictionary_detail.ItemValue==up_data['ItemValue']:
        count=DictionaryDetail.query.filter_by(DictionaryID=up_data['DictionaryID'],ItemValue=up_data['ItemValue']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'ItemValue重复'})
    if not dictionary_detail.position==up_data['position']:
        count=DictionaryDetail.query.filter_by(DictionaryID=up_data['DictionaryID'],position=up_data['position']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'position重复'})
    if not int(dictionary_detail.isDefault) == int(up_data['isDefault']):
        if(int(up_data['isDefault']) == 1):
            count=DictionaryDetail.query.filter_by(DictionaryID=up_data['DictionaryID'],isDefault=up_data['isDefault']).first()
            if(count):
                return jsonify({'status':'error','data':'','error':'isDefault重复'})
    try:
        # dictionary_detail.ItemKey=up_data['ItemKey']
        dictionary_detail.ItemValue=up_data['ItemValue']
        dictionary_detail.position=up_data['position']
        dictionary_detail.isDefault=up_data['isDefault']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'更新子字典错误'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/dictionary/Dictionary', methods=['POST'])
@check_role(13)
def add_dictionary():
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # add_data={'code': '1', 'desc': '1'}
    count=Dictionary.query.filter_by(code=add_data['code']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'字典名已存在'})
    dictionary=Dictionary(add_data['code'],add_data['desc'])
    db.session.add(dictionary)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/dictionary/DictionaryDetail', methods=['POST'])
@check_role(13)
def add_dictionary_detail():
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # add_data={'DictionaryID': 1, 'ItemKey': '1', 'ItemValue': '1', 'position': '1', 'isDefault': '1'}
    if add_data['isDefault'] not in ['0','1']:
        return jsonify({'status':'error','data':'','error':'isDefault的值应为0或1'})
    # count=DictionaryDetail.query.filter_by(DictionaryID=add_data['DictionaryID'],ItemKey=add_data['ItemKey']).first()
    # if(count):
    #     return jsonify({'status':'error','data':'','error':'ItemKey重复'})
    count=DictionaryDetail.query.filter_by(DictionaryID=add_data['DictionaryID'],ItemValue=add_data['ItemValue']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'ItemValue重复'})
    count=DictionaryDetail.query.filter_by(DictionaryID=add_data['DictionaryID'],position=add_data['position']).first()
    if(count):
        return jsonify({'status':'error','data':'','error':'position重复'})
    if(int(add_data['isDefault']) == 1):
        count=DictionaryDetail.query.filter_by(DictionaryID=add_data['DictionaryID'],isDefault=add_data['isDefault']).first()
        if(count):
            return jsonify({'status':'error','data':'','error':'isDefault重复'})
    dictionary_detail=DictionaryDetail(add_data['DictionaryID'],add_data['ItemValue'],add_data['position'],add_data['isDefault'])
    db.session.add(dictionary_detail)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/dictionary/DictionaryDetail/<int:dictionary_detail_id>', methods=['DELETE'])
@check_role(14)
def delet_dictionary_detail(dictionary_detail_id):
    try:
        dictionary_detail=DictionaryDetail.query.filter_by(id=dictionary_detail_id).first()
        db.session.delete(dictionary_detail)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'删除失败'})
    return jsonify({'status':'success','data':'','error':''})


@mod.route('/dictionary/Dictionary/<int:dictionary_id>', methods=['DELETE'])
@check_role(14)
def delet_dictionary(dictionary_id):
    try:
        dictionary_detail=DictionaryDetail.query.filter_by(DictionaryID=dictionary_id).all()
        # print(dictionary_detail)
        for data in dictionary_detail:
            db.session.delete(data)
        dictionary=Dictionary.query.filter_by(id=dictionary_id).first()
        db.session.delete(dictionary)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'删除失败'})
    return jsonify({'status':'success','data':'','error':''})