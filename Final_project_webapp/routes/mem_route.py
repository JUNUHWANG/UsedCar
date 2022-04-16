from flask import request, render_template, redirect, Blueprint, session
from models import MemService, Member

service = MemService()

bp = Blueprint('member', __name__, url_prefix='/member')

@bp.route('/join')
def joinForm():
    return render_template('member/form.html')

@bp.route('/join', methods=['POST'])
def join():
    id = request.form['id']
    pwd = request.form['pwd']
    name = request.form['name']
    email = request.form['email']
    service.join(Member(id=id, pwd=pwd, name=name, email=email))
    return render_template('member/login.html')

@bp.route('/login')
def loginForm():
    return render_template('member/login.html')

@bp.route('/login', methods=['POST'])
def login():
    id = request.form['id']
    pwd = request.form['pwd']
    flag = service.login(id, pwd)
    return render_template('index.html')

@bp.route('/myinfo')
def myinfo():
    m = service.myInfo()
    return render_template('member/detail.html', m=m)

@bp.route('/out')
def out():
    service.out()
    return render_template('index.html')

@bp.route('/logout')
def logout():
    service.logout()
    return render_template('index.html')

@bp.route('/edit', methods=['POST'])
def edit():
    pwd = request.form['pwd']
    service.editMyInfo(pwd)
    return render_template('index.html')

@bp.route('/index')
def index():
    return render_template('index.html')
