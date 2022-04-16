from flask import request, render_template, redirect, Blueprint, url_for, session
from models import Carinfo, CarInfoService
import pandas as pd
import numpy as np
import sklearn
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

service = CarInfoService()

bp = Blueprint('carinfo', __name__, url_prefix='/carinfo')

currentpath = os.getcwd()


@bp.route('/input1')
def input1Form():
    return render_template('carinfo/input1.html')

@bp.route('/input1', methods=['POST'])
def input1():
    carinfo = Carinfo(
        id = request.form['id'],
        car_buy_price = request.form['car_buy_price'],
        car_num = request.form['car_num'],
        car_name = request.form['car_name'],
        car_company = request.form['car_company'],
        car_year = request.form['car_year'],
        car_buytime = request.form['car_buytime'],
        car_km = request.form['car_km'],
        car_fuel = request.form['car_fuel'],
        car_gear = request.form['car_gear'],
        car_size = request.form['car_size'],
        car_cc = request.form['car_cc'],
        car_color = request.form['car_color'],
        car_sellarea = request.form['car_sellarea']

    )
    return render_template('carinfo/input2.html', c=carinfo)

@bp.route('/input2')
def input2Form():
    return render_template('carinfo/input2.html')

# 이전 페이지에서 받았던 데이터들은 jsp에서 모두 히든으로 처리
@bp.route('/input2', methods=['POST'])
def input2():
    carinfo = Carinfo(
        id=request.form['id'],
        car_buy_price=request.form['car_buy_price'],
        car_num=request.form['car_num'],
        car_name=request.form['car_name'],
        car_company=request.form['car_company'],
        car_year=request.form['car_year'],
        car_buytime=request.form['car_buytime'],
        car_km=request.form['car_km'],
        car_fuel=request.form['car_fuel'],
        car_gear=request.form['car_gear'],
        car_size=request.form['car_size'],
        car_cc=request.form['car_cc'],
        car_color=request.form['car_color'],
        car_sellarea=request.form['car_sellarea'],

        car_tax_count = request.form['car_tax_count'],
        car_seize_count = request.form['car_seize_count'],
        car_security_count = request.form['car_security_count'],
        car_accident_count = request.form['car_accident_count'],
        car_flood_count = request.form['car_flood_count'],
        car_change_using_count = request.form['car_change_using_count'],
        car_change_owner_count = request.form['car_change_owner_count'],
        car_broken = request.form['car_broken']
        )
    return render_template('carinfo/input3.html', c=carinfo)

@bp.route('/input3')
def input3Form():
    return render_template('carinfo/input3.html')

@bp.route('/input3', methods=['POST'])
def input3():
    c = Carinfo(
        id=request.form['id'],
        car_buy_price=request.form['car_buy_price'],
        car_num=request.form['car_num'],
        car_name=request.form['car_name'],
        car_company=request.form['car_company'],
        car_year=request.form['car_year'],
        car_buytime=request.form['car_buytime'],
        car_km=request.form['car_km'],
        car_fuel=request.form['car_fuel'],
        car_gear=request.form['car_gear'],
        car_size=request.form['car_size'],
        car_cc=request.form['car_cc'],
        car_color=request.form['car_color'],
        car_sellarea=request.form['car_sellarea'],

        car_tax_count=request.form['car_tax_count'],
        car_seize_count=request.form['car_seize_count'],
        car_security_count=request.form['car_security_count'],
        car_accident_count=request.form['car_accident_count'],
        car_flood_count=request.form['car_flood_count'],
        car_change_using_count=request.form['car_change_using_count'],
        car_change_owner_count=request.form['car_change_owner_count'],
        car_broken=request.form['car_broken'],

        car_option_sunloop = request.form['car_option_sunloop'],
        car_option_wheel = request.form['car_option_wheel'],
        car_option_navi = request.form['car_option_navi'],
        car_option_light = request.form['car_option_light'],
        car_option_parkingsensor = request.form['car_option_parkingsensor'],
        car_option_leatherseat = request.form['car_option_leatherseat'],
        car_option_hotseat = request.form['car_option_hotseat'],
        car_option_airbag = request.form['car_option_airbag'],
        car_option_highpass = request.form['car_option_highpass'],
        car_option_wiper = request.form['car_option_wiper'],
        car_option_smartkey = request.form['car_option_smartkey'],
        car_option_autoside = request.form['car_option_autoside'],
        car_option_coolseat = request.form['car_option_coolseat'],
        car_option_tpms = request.form['car_option_tpms'],
        car_option_bluetooth = request.form['car_option_bluetooth'],
        car_option_hothandle = request.form['car_option_hothandle'],
        car_option_aeb = request.form['car_option_aeb'],
        car_option_ldsw = request.form['car_option_ldsw'],
        car_option_cruise = request.form['car_option_cruise'],
        car_option_autotrunk = request.form['car_option_autotrunk']
        )
    ## 분석 코드 실행

    # 인코딩 된 칼럼 데이터 별도 csv 파일에 저장하여 불러오기
        
    data_col = pd.read_csv(currentpath + '/pythonProject/used_car_webapp/used_car/Final_project_webapp/csv/encoded_column_name.csv')
    data_col.drop(columns=['Unnamed: 0'], inplace=True)

    # 칼럼 인덱스 / 리스트 맞춰서
    columns_dict = {}

    for idx, values in enumerate(data_col.columns):
        columns_dict[values] = idx

    # input data zero matrix로 받아서 설정
    input_data = [0] * len(data_col.columns)

    # 조회 데이터의 경우 무조건 판매 완료된 데이터로 비교
    # 유사 가격 조회시 판매 중인 데이터 대상으로 검색??
    input_data[columns_dict['판매완료 여부_1']] = 1

    input_data[columns_dict['차종-중분류_' + c.car_name]] = 1
    input_data[columns_dict['출고가']] = int(c.car_buy_price)


    # 사용기간 -- 년/월 데이터를 --개월로 변경 // 현재 년도 및 월 코드로 받아올 수 있도록 수정
    using_period_list = c.car_buytime.split('-')
    now_year=2022
    now_month=3
    using_period = 0

    for i in using_period_list:
        if len(i) == 4:
            using_period = 12 * (now_year - int(i))
        else:
            if (now_month - int(i)) < 0:
                using_period -= (12 + (now_month - int(i)))
            else:
                using_period += (now_month - int(i))

    input_data[columns_dict['사용 기간']] = np.log(using_period)

    # 뒤에 두자리 숫자만 입력하게
    input_data[columns_dict['연형_' + str(c.car_year)]] = 1
    input_data[columns_dict['주행거리']] = np.log(int(c.car_km))

    # 셀렉 박스
    # 'CNG', LPG','가솔린','디젤','전기','하이브리드(LPG)','하이브리드(가솔린)','하이브리드(디젤)'
    input_data[columns_dict['연료_' + c.car_fuel]] = 1
    # 'CVT', 'SAT', '수동' '오토'
    input_data[columns_dict['변속기_' + c.car_gear]] = 1
    # 'RV', 'SUV','경차', '대형', '버스', '소형', '스포츠카', '승합', '준중형','중형'
    input_data[columns_dict['차종.1_' + c.car_size]] = 1
    # '강원',경기','경남','경북','광주','대구','대전','부산','서울','울산','인천','전남','전북','제주','충남', '충북'
    input_data[columns_dict['판매지역_' + c.car_sellarea]] = 1

    ## 숫자 입력
    input_data[columns_dict['세금미납']] = int(c.car_tax_count)
    input_data[columns_dict['압류']] = int(c.car_seize_count)
    input_data[columns_dict['저당']] = int(c.car_security_count)
    input_data[columns_dict['소유자변경이력']] = int(c.car_change_owner_count)

    ## 사고 횟수 숫자입력
    input_data[columns_dict['내차 사고 피해 보험 횟수']] = int(c.car_accident_count)

    if int(c.car_accident_count) == 1:
        input_data[columns_dict['사고내역여부_1']] = 1
    else:
        input_data[columns_dict['사고내역여부_0']] = 1

    ## 체크박스 - 있음 없음  1 , 0 으로 값 전달
    input_data[columns_dict['용도이력_' + str(c.car_change_using_count)]] = 1
    input_data[columns_dict['침수이력_' + str(c.car_flood_count)]] = 1
    input_data[columns_dict['전손이력_' + str(c.car_broken)]] = 1
    input_data[columns_dict['판매지역_' + str(c.car_sellarea)]] = 1

    ## 체크박스 - 있으면 체크
    input_data[columns_dict['옵션_썬루프']] = int(c.car_option_sunloop)
    input_data[columns_dict['옵션_알루미늄휠']] = int(c.car_option_wheel)
    input_data[columns_dict['옵션_내비게이션']] = int(c.car_option_navi)
    input_data[columns_dict['옵션_오토라이트']] = int(c.car_option_light)
    input_data[columns_dict['옵션_주차감지센서']] = int(c.car_option_parkingsensor)
    input_data[columns_dict['옵션_가죽시트']] = int(c.car_option_leatherseat)
    input_data[columns_dict['옵션_열선시트']] = int(c.car_option_hotseat)
    input_data[columns_dict['옵션_사이드&커튼에어백']] = int(c.car_option_airbag)
    input_data[columns_dict['옵션_하이패스룸밀러']] = int(c.car_option_highpass)
    input_data[columns_dict['옵션_레인선서와이퍼']] = int(c.car_option_wiper)
    input_data[columns_dict['옵션_스마트키']] = int(c.car_option_smartkey)
    input_data[columns_dict['옵션_전동접이사이드미러']] = int(c.car_option_autoside)
    input_data[columns_dict['옵션_통풍시트']] = int(c.car_option_coolseat)
    input_data[columns_dict['옵션_타이어공기압장치(TPMS)']] = int(c.car_option_tpms)
    input_data[columns_dict['옵션_블루투스']] = int(c.car_option_bluetooth)
    input_data[columns_dict['옵션_핸들열선']] = int(c.car_option_hothandle)
    input_data[columns_dict['옵션_자동긴급제동(AEB)']] = int(c.car_option_aeb)
    input_data[columns_dict['옵션_차선이탈경보(LDSW)']] = int(c.car_option_ldsw)
    input_data[columns_dict['옵션_크루즈컨트롤']] = int(c.car_option_cruise)
    input_data[columns_dict['옵션_전동트렁크']] = int(c.car_option_autotrunk)

    #국산 / 외제에 따라 사용 모델 차이 발생
    input_data[columns_dict['제조사_' + c.car_company]] = 1

    kor_company_list = ['현대', '기아', '제네시스', '한국GM', '르노삼성', '쌍용']

    # 모델 파일경로에서 불러오기
    filename = currentpath + '/pythonProject/used_car_webapp/used_car/Final_project_webapp/model/'
    if c.car_company in kor_company_list:
        input_data[columns_dict['수입여부_국산']] = 1
        filename += 'RandomForestRegressor_kor_depth19model.sav'
    else:
        input_data[columns_dict['수입여부_수입']] = 1
        filename += 'RandomForestRegressor_overseas_depth14model.sav'

    loaded_model = pickle.load(open(filename, 'rb'))

    # 데이터 프레임에 데이터 넣어서 형식 재조정
    data_col.loc[0] = input_data
    price_input_data = loaded_model.predict(data_col)

    # 100만원 이하일 경우 후처리
    if price_input_data < 100:
        price_input_data = 100


    carinfo = Carinfo(
        id=request.form['id'],
        car_sell_price=round(float(price_input_data),0),
        car_buy_price=request.form['car_buy_price'],
        car_num=request.form['car_num'],
        car_name=request.form['car_name'],
        car_company=request.form['car_company'],
        car_year=request.form['car_year'],
        car_buytime=request.form['car_buytime'],
        car_km=int(request.form['car_km']),
        car_fuel=request.form['car_fuel'],
        car_gear=request.form['car_gear'],
        car_size=request.form['car_size'],
        car_cc=int(request.form['car_cc']),
        car_color=request.form['car_color'],

        car_tax_count=int(request.form['car_tax_count']),
        car_seize_count=int(request.form['car_seize_count']),
        car_security_count=int(request.form['car_security_count']),
        car_accident_count=int(request.form['car_accident_count']),
        car_flood_count=int(request.form['car_flood_count']),
        car_change_using_count=int(request.form['car_change_using_count']),
        car_change_owner_count=int(request.form['car_change_owner_count']),
        car_broken=int(request.form['car_broken']),
        car_sellarea=request.form['car_sellarea'],

        car_option_sunloop=int(request.form['car_option_sunloop']),
        car_option_wheel=int(request.form['car_option_wheel']),
        car_option_navi=int(request.form['car_option_navi']),
        car_option_light=int(request.form['car_option_light']),
        car_option_parkingsensor=int(request.form['car_option_parkingsensor']),
        car_option_leatherseat=int(request.form['car_option_leatherseat']),
        car_option_hotseat=int(request.form['car_option_hotseat']),
        car_option_airbag=int(request.form['car_option_airbag']),
        car_option_highpass=int(request.form['car_option_highpass']),
        car_option_wiper=int(request.form['car_option_wiper']),
        car_option_smartkey=int(request.form['car_option_smartkey']),
        car_option_autoside=int(request.form['car_option_autoside']),
        car_option_coolseat=int(request.form['car_option_coolseat']),
        car_option_tpms=int(request.form['car_option_tpms']),
        car_option_bluetooth=int(request.form['car_option_bluetooth']),
        car_option_hothandle=int(request.form['car_option_hothandle']),
        car_option_aeb=int(request.form['car_option_aeb']),
        car_option_ldsw=int(request.form['car_option_ldsw']),
        car_option_cruise=int(request.form['car_option_cruise']),
        car_option_autotrunk=int(request.form['car_option_autotrunk'])
    )

    expect_min_price = int(round(float(price_input_data * 0.95), 0))
    expect_max_price = int(round(float(price_input_data * 1.05), 0))

    return render_template('carinfo/result.html', c=carinfo, min=expect_min_price, max=expect_max_price)

@bp.route('/result')
def resultForm():
    return render_template('carinfo/result.html')

@bp.route('/result', methods=['POST'])
def result():
    carinfo = Carinfo(
        id=request.form['id'],
        car_sell_price=int(float(request.form['car_sell_price'])),
        car_buy_price=int(request.form['car_buy_price']),
        car_num=request.form['car_num'],
        car_name=request.form['car_name'],
        car_company=request.form['car_company'],
        car_year=request.form['car_year'],
        car_buytime=request.form['car_buytime'],
        car_km=int(request.form['car_km']),
        car_fuel=request.form['car_fuel'],
        car_gear=request.form['car_gear'],
        car_size=request.form['car_size'],
        car_cc=int(request.form['car_cc']),
        car_color=request.form['car_color'],

        car_tax_count=int(request.form['car_tax_count']),
        car_seize_count=int(request.form['car_seize_count']),
        car_security_count=int(request.form['car_security_count']),
        car_accident_count=int(request.form['car_accident_count']),
        car_flood_count=int(request.form['car_flood_count']),
        car_change_using_count=int(request.form['car_change_using_count']),
        car_change_owner_count=int(request.form['car_change_owner_count']),
        car_broken=int(request.form['car_broken']),
        car_sellarea=request.form['car_sellarea'],

        car_option_sunloop=int(request.form['car_option_sunloop']),
        car_option_wheel=int(request.form['car_option_wheel']),
        car_option_navi=int(request.form['car_option_navi']),
        car_option_light=int(request.form['car_option_light']),
        car_option_parkingsensor=int(request.form['car_option_parkingsensor']),
        car_option_leatherseat=int(request.form['car_option_leatherseat']),
        car_option_hotseat=int(request.form['car_option_hotseat']),
        car_option_airbag=int(request.form['car_option_airbag']),
        car_option_highpass=int(request.form['car_option_highpass']),
        car_option_wiper=int(request.form['car_option_wiper']),
        car_option_smartkey=int(request.form['car_option_smartkey']),
        car_option_autoside=int(request.form['car_option_autoside']),
        car_option_coolseat=int(request.form['car_option_coolseat']),
        car_option_tpms=int(request.form['car_option_tpms']),
        car_option_bluetooth=int(request.form['car_option_bluetooth']),
        car_option_hothandle=int(request.form['car_option_hothandle']),
        car_option_aeb=int(request.form['car_option_aeb']),
        car_option_ldsw=int(request.form['car_option_ldsw']),
        car_option_cruise=int(request.form['car_option_cruise']),
        car_option_autotrunk=int(request.form['car_option_autotrunk'])
    )
    # 데이터 db 저장
    service.addcarinfo(carinfo)
    return render_template('index.html')

@bp.route('/mycarinfolist')
def mycarinfolist():
    list_carinfo = service.getmycarinfo()
    return render_template('carinfo/mycarinfolist.html', list_carinfo = list_carinfo)

@bp.route('/del/<int:carinfono>')
def delcarinfo(carinfono):
    service.delmycarinfo(carinfono)
    # blueprint 에서 url_for 사용법 찾아볼것
    # return redirect(url_for('mycarinfolist'))
    return redirect('/carinfo/mycarinfolist')

@bp.route('/detail/<int:carinfono>')
def detailForm(carinfono):
    carinfo = service.carinfodetail(carinfono)
    list_carinfo = []

    expect_min_price = round(float(carinfo.car_sell_price * 0.95), 0)
    expect_max_price = round(float(carinfo.car_sell_price * 1.05), 0)

    return render_template('carinfo/detail.html', c = carinfo, min=expect_min_price, max=expect_max_price, list_carinfo=list_carinfo)

@bp.route('/detail/<int:carinfono>', methods=['POST'])
def detail(carinfono):
    filter_list = request.form.getlist('filter')
    carinfo = service.carinfodetail(carinfono)
    filter_data = service.finddata(carinfo.carinfono, filter_list)

    expect_min_price = round(float(carinfo.car_sell_price * 0.95), 0)
    expect_max_price = round(float(carinfo.car_sell_price * 1.05), 0)

    return render_template('carinfo/detail.html', c = carinfo, min=expect_min_price, max=expect_max_price, filter_data=filter_data)
