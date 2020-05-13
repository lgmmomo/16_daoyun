
from flask_web.dictionary import dictionary_op
from flask_web import app
from flask_web.login import login_check
from flask_web.Course import course_op
from flask_web.Teacher import tearcher_op
from flask_web.student import student_op
from flask_web.app_student import app_student_op
from flask_web.app_teacher import app_teacher_op
from flask_web.user import user_op
from flask_web.role import role_op

@app.route('/')
def hello_world():
    return 'Hello World!'

app.register_blueprint(dictionary_op.mod)
app.register_blueprint(login_check.mod)
app.register_blueprint(course_op.mod)
app.register_blueprint(tearcher_op.mod)
app.register_blueprint(student_op.mod)
app.register_blueprint(app_student_op.mod)
app.register_blueprint(app_teacher_op.mod)
app.register_blueprint(user_op.mod)
app.register_blueprint(role_op.mod)