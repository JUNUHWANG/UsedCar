import json
from flask import jsonify,request, render_template, redirect, Blueprint, session
from models import MemService, Member
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


service = MemService()

bp = Blueprint('member', __name__, url_prefix='/member')



@bp.route("/token", methods=["POST"])
def create_token():
    print(request.json)
    id = request.json.get("id", None)
    pwd = request.json.get("password", None)
    print(id, pwd)
    result = service.login(id, pwd)
    
    if result == False:
        return jsonify({"msg": "Bad id or password"}), 401

    access_token = create_access_token(identity=id)
    curr_user = id
    return jsonify(access_token=access_token, curr_user=curr_user)


@bp.route('/join')
def joinForm():
    return render_template('member/form.html')

@bp.route('/join', methods=['POST'])
def join():
    params = request.get_json()
    print(params)
    print(type(request))
    if request.method == 'POST':
        print(request.json)
    id = params['id']
    pwd = params['password']
    name = params['name']
    email = params['email']
    service.join(Member(id=id, pwd=pwd, name=name, email=email))
    return render_template('member/login.html')

@bp.route('/login')
def loginForm():
    return render_template('member/login.html')

@bp.route('/login', methods=['POST'])
def login():
    params = request.get_json()
    print(params)
    print(type(request))
    id = params['id']
    pwd = params['password']
    flag = service.login(id, pwd)
    print(flag) 
    return flag

@bp.route('/myinfo', methods=['POST'])
def myinfo():
    params = request.get_json()
    print(params)
    print(type(request))
    id = params['id']
    m = service.myInfo(id)
    print(m)

    res_m = {}

    for key, value in m.__dict__.items():
            if not((type(value) is int) | (type(value) is str) | (type(value) is float)):
                continue
            else:
                res_m[key] = value
    print(res_m)
    return res_m

@bp.route('/out', methods=['POST'])
def out():
    params = request.get_json()
    print(params)
    print(type(request))
    id = params['id']
    print("route 에서 id" + id)
    service.out(id)
    return id

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







