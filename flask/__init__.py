from flask import Flask, url_for, request, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import timedelta
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://web:Wzxj123456@localhost:3306/web?charset=utf8'
app.config['SQLALCHEMY_COMMIT_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SECRET_KEY']=os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME']=timedelta(days=1)
db = SQLAlchemy(app)

from flask_web import url_register