from flask import Blueprint

views = Blueprint('views', __name__)

@views.route('/python')
def python():
    return '<h1>Flask Backend</h1>'
