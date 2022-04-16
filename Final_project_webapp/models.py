from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import session
import pandas as pd
import os

db = SQLAlchemy()
migrate = Migrate()


class Member(db.Model):
    id = db.Column(db.String(20), primary_key=True)
    pwd = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False)

# 검색이력 저장
class Carinfo(db.Model):
    carinfono = db.Column( db.Integer, primary_key=True, unique=True, autoincrement=True)
    id = db.Column( db.String( 20 ), db.ForeignKey( 'member.id', ondelete='CASCADE' ) )
    ## 가격은 모델 돌린 후 들어갈 내용
    car_sell_price = db.Column(db.Integer, nullable=False )
    ## 검색 데이터의 경우 모두 판매중으로 들어갈 예정
    car_num = db.Column( db.String( 10 ), nullable=False )
    ## 차량 이름 -- 차종으로 바로 바꿀수있도록
    car_name = db.Column( db.String( 50 ), nullable=False )
    car_company = db.Column(db.String(50), nullable=False)
    car_buy_price = db.Column(db.Float, nullable=False)
    car_year = db.Column(db.String( 50 ), nullable=False)
    car_buytime = db.Column(db.String(10), nullable=False)
    car_km = db.Column(db.Integer, nullable=False)
    car_fuel = db.Column(db.String(10), nullable=False)
    car_gear = db.Column(db.String(10), nullable=False)
    car_size = db.Column(db.String(10), nullable=False)
    car_cc = db.Column(db.Integer, nullable=False)
    car_color = db.Column(db.String(10), nullable=False)

    car_tax_count = db.Column(db.Integer, nullable=False)
    car_seize_count = db.Column(db.Integer, nullable=False)
    car_security_count = db.Column(db.Integer, nullable=False)
    car_accident_count = db.Column(db.Integer, nullable=False)
    car_flood_count = db.Column(db.Integer, nullable=False)
    car_change_using_count = db.Column(db.Integer, nullable=False)
    car_change_owner_count = db.Column(db.Integer, nullable=False)
    # 전손이력은 유무
    car_broken = db.Column(db.Integer, nullable=False)
    car_sellarea = db.Column(db.String(10), nullable=False)
    # 옵션은 유무로 1,0으로 저장
    # 옵션_썬루프,옵션_알루미늄휠,옵션_내비게이션,옵션_오토라이트,옵션_주차감지센서,옵션_가죽시트,옵션_열선시트,옵션_사이드&커튼에어백,
    # 옵션_하이패스룸밀러,옵션_레인선서와이퍼,옵션_스마트키,옵션_전동접이사이드미러,옵션_통풍시트,옵션_타이어공기압장치(TPMS),옵션_블루투스,
    # 옵션_핸들열선,옵션_자동긴급제동(AEB),옵션_차선이탈경보(LDSW),옵션_크루즈컨트gi롤,옵션_전동트렁크
    car_option_sunloop = db.Column(db.Integer, nullable=False)
    car_option_wheel = db.Column(db.Integer, nullable=False)
    car_option_navi = db.Column(db.Integer, nullable=False)
    car_option_light = db.Column(db.Integer, nullable=False)
    car_option_parkingsensor = db.Column(db.Integer, nullable=False)
    car_option_leatherseat = db.Column(db.Integer, nullable=False)
    car_option_hotseat = db.Column(db.Integer, nullable=False)
    car_option_airbag = db.Column(db.Integer, nullable=False)
    car_option_highpass = db.Column(db.Integer, nullable=False)
    car_option_wiper = db.Column(db.Integer, nullable=False)
    car_option_smartkey = db.Column(db.Integer, nullable=False)
    car_option_autoside = db.Column(db.Integer, nullable=False)
    car_option_coolseat = db.Column(db.Integer, nullable=False)
    car_option_tpms = db.Column(db.Integer, nullable=False)
    car_option_bluetooth = db.Column(db.Integer, nullable=False)
    car_option_hothandle = db.Column(db.Integer, nullable=False)
    car_option_aeb = db.Column(db.Integer, nullable=False)
    car_option_ldsw = db.Column(db.Integer, nullable=False)
    car_option_cruise = db.Column(db.Integer, nullable=False)
    car_option_autotrunk = db.Column(db.Integer, nullable=False)

class MemService:
    def join(self, m: Member):  # 회원가입
        db.session.add( m )  # insert구문실행
        db.session.commit()  # 쓰기 작업 커밋

    def login(self, id: str, pwd: str):  # 로그인
        mem = Member.query.get( id )  # primary key 기준으로 select
        if mem is not None:
            if pwd == str(mem.pwd):
                session['login_id'] = id
                session['flag'] = True
                return True
        return False

    def myInfo(self):  # 로그인 한 id로 검색한 객체 반환
        id = session['login_id']
        return Member.query.get( id )

    def editMyInfo(self, pwd: str):  # 새 pwd받아서 현재 로그인 중인 id로 검색하여 수정
        mem = self.myInfo()
        mem.pwd = pwd  # 수정할 객체의 멤버변수를 수정하면 테이블 컬럼값도 수정됨
        db.session.commit()  # 쓰기완료

    def logout(self):  # session에서 id 삭제 및 flag =False로 변환
        session.pop( 'login_id' )
        session['flag'] = False

    def out(self):  # 로그인한 id를 db에서 삭제. 로그아웃 처리.
        mem = self.myInfo()
        db.session.delete( mem )  # delete문 실행. 파라미터로 삭제할 객체 지정
        db.session.commit()
        self.logout()

## DB 이용 : id로 검색 이력 저장
## CSV 이용 : 유사 가격 매물 보여주기 (동일 차종 / 국산 / 수입) -- pageno 넘겨서 링크 연결 // 인코딩 칼럼 활용해서 모형에 넣고 분석
## DB에는 예상 가격 저장, 가격대는 예상 가격 기준 +- 5% 범위 잡고 보여줄 것

class CarInfoService:
    def addcarinfo(self, c:Carinfo):
        db.session.add(c)
        db.session.commit()

    def carinfodetail(self, carinfono:int):
        carinfo = Carinfo.query.get(carinfono)
        return carinfo

    def getmycarinfo(self):  # 로그인 한 id로 검색한 객체 반환
        list_carinfo = Carinfo.query.filter_by(id = session['login_id']).all()
        return list_carinfo

    def delmycarinfo(self, carinfono:int):  # 로그인한 id를 db에서 삭제. 로그아웃 처리.
        carinfo = Carinfo.query.get(carinfono)
        db.session.delete( carinfo )  # delete문 실행. 파라미터로 삭제할 객체 지정
        db.session.commit()

    # 동일 차종 연식 시세, // 실 데이터를 어떤 기준으로 보고싶어하는가??
    def finddata(self, carinfono:int, filter_list:list):
        currentpath = os.getcwd()
        data = pd.read_csv( currentpath + '/pythonProject/used_car_webapp/used_car/Final_project_webapp/csv/merge_search.csv', encoding='utf8' )
        data.drop(columns=['Unnamed: 0'],inplace=True)

        data['연형'] = data['연형'].astype(str).str.zfill(2)

        carinfo = Carinfo.query.get(carinfono)

        expect_min_price = int(round(float(carinfo.car_sell_price * 0.95), 0))
        expect_max_price = int(round(float(carinfo.car_sell_price * 1.05), 0))

        expect_min_km = int(round(float(carinfo.car_km * 0.9), 0))
        expect_max_km = int(round(float(carinfo.car_km * 1.1), 0))

        expect_min_year = int(carinfo.car_year) - 1
        expect_max_year = int(carinfo.car_year) + 1

        if expect_min_year < 0:
            expect_min_year += 100

        if expect_max_year == 100:
            expect_max_year = 0

        for i in filter_list:
            if i == '가격':
                data = data[(data['가격'] < expect_max_price ) & (data['가격'] > expect_min_price)]
            elif i == '차종':
                data = data[(data['차종'] == carinfo.car_name)]
            elif i == '연형':
                data = data[(data['연형'] == (carinfo.car_year.zfill(2))) |
                            (data['연형'] == (str(expect_min_year).zfill(2))) |
                            (data['연형'] == (str(expect_max_year).zfill(2)))]
            elif i == '주행거리':
                data = data[(data['주행거리'] < expect_max_km) & (data['주행거리'] > expect_min_km)]

        if len(data) > 10:
            data = data.sample(n=10)

        return data.values