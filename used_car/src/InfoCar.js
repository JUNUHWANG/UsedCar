import React, { useState, useEffect } from 'react';
import Logo from "./Logo"
import axios from 'axios';
import "./css/InfoCar.css"
import { useNavigate } from "react-router-dom"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';
import CountUp from 'react-countup';
import priceintro from './asset/priceintro.svg'
import resultimage from './asset/resultimage.svg'

registerLocale('ko', ko);

export const InfoCar = () => {
      //로딩
      const [loading, setLoading] = useState(false);
      /* 페이지 넘버 */
      const [counts, setCounts] = useState(0);
      /* 페이지 넘버 변경 함수 */
      const addCount = () => {
            setCounts(counts + 1);
      };
      const user = sessionStorage.getItem("user")
      const [id, setId] = useState(user)

      const navigate = useNavigate(); 

  /*     const [startDate, setStartDate] = useState(new Date());
      registerLocale("ko", ko); */

      



      const CarInfo = {
            id: id,
            car_num: "",
            car_buy_price: "",
            car_company: "",
            car_name: "",
            car_year: "",
            car_buytime: "",
            car_km: "",
            car_fuel: "",
            car_gear: "",
            car_size: "",
            car_sellarea: "",
            car_cc: "",
            car_color: "",
            car_tax_count: "",
            car_seize_count: "",
            car_security_count: "",
            car_accident_count: "",
            car_flood_count: "",
            car_change_using_count: "",
            car_change_owner_count: "",
            car_broken: "",
            car_option_sunloop: "",
            car_option_wheel: "",
            car_option_navi: "",
            car_option_light: "",
            car_option_parkingsensor: "",
            car_option_leatherseat: "",
            car_option_hotseat: "",
            car_option_airbag: "",
            car_option_highpass: "",
            car_option_wiper: "",
            car_option_smartkey: "",
            car_option_autoside: "",
            car_option_coolseat: "",
            car_option_tpms: "",
            car_option_bluetooth: "",
            car_option_hothandle: "",
            car_option_aeb: "",
            car_option_ldsw: "",
            car_option_cruise: "",
            car_option_autotrunk: ""
      };

      const [values, setValues] = useState(CarInfo);


      const [result, setresult] = useState(null);
      console.log(values)
      


      useEffect(() => {
      });



      async function postData() {
            try {
                  setId(user)
                  setLoading(true);
                  const response = await axios.post('/carinfo/input3', {
                        id: values.id,
                        car_num: values.car_num,
                        car_buy_price: Number(values.car_buy_price),
                        car_company: values.car_company,
                        car_name: values.car_name,
                        car_year: values.car_year,
                        car_buytime: values.car_buytime,
                        car_km: values.car_km,
                        car_fuel: values.car_fuel,
                        car_gear: values.car_gear,
                        car_size: values.car_size,
                        car_sellarea: values.car_sellarea,
                        car_cc: Number(values.car_cc),
                        car_color: values.car_color,
                        car_tax_count: Number(values.car_tax_count),
                        car_seize_count: Number(values.car_seize_count),
                        car_security_count: Number(values.car_security_count),
                        car_accident_count: Number(values.car_accident_count),
                        car_flood_count: Number(values.car_flood_count),
                        car_change_using_count: Number(values.car_change_using_count),
                        car_change_owner_count: Number(values.car_change_owner_count),
                        car_broken: Number(values.car_broken),
                        car_option_sunloop: Number(values.car_option_sunloop),
                        car_option_wheel: Number(values.car_option_wheel),
                        car_option_navi: Number(values.car_option_navi),
                        car_option_light: Number(values.car_option_light),
                        car_option_parkingsensor: Number(values.car_option_parkingsensor),
                        car_option_leatherseat: Number(values.car_option_leatherseat),
                        car_option_hotseat: Number(values.car_option_hotseat),
                        car_option_airbag: Number(values.car_option_airbag),
                        car_option_highpass: Number(values.car_option_highpass),
                        car_option_wiper: Number(values.car_option_wiper),
                        car_option_smartkey: Number(values.car_option_smartkey),
                        car_option_autoside: Number(values.car_option_autoside),
                        car_option_coolseat: Number(values.car_option_coolseat),
                        car_option_tpms: Number(values.car_option_tpms),
                        car_option_bluetooth: Number(values.car_option_bluetooth),
                        car_option_hothandle: Number(values.car_option_hothandle),
                        car_option_aeb: Number(values.car_option_aeb),
                        car_option_ldsw: Number(values.car_option_ldsw),
                        car_option_cruise: Number(values.car_option_cruise),
                        car_option_autotrunk: Number(values.car_option_autotrunk)
                  }, {
                        withCredentials: true
                  })
                  .then(res => {
                        setresult(res.data);
                  })
                  console.log(response);

            } catch (error) {
                  console.error(error);
            }
            setLoading(false);
      }


      if (loading) return <div>로딩중..</div>;
      //전송 발생 이벤트 함수
      const onSubmit = (event) => {
            event.preventDefault();
            console.log(values)
            postData();
            addCount();


      }
      const toMain =() => {
            navigate('/main')
      }


      const onChange = (event) => {
            setValues({ ...values, [event.target.name]: event.target.value });
      };

      const onSelectHandler = (event) => {
            setValues({ ...values, [event.target.name]: event.target.value });
      };

      const onDateHandler = (event) => {
            setValues({ ...values, [event.target.name]: event.target.value });
      };

      async function saveData() {
            try {
                  setLoading(true);

                  const response = await axios.post('/carinfo/result', {
                        id : result.carinfo.id,
                        car_num: result.carinfo.car_num,
                        car_buy_price: Number(result.carinfo.car_buy_price),
                        car_company: result.carinfo.car_company,
                        car_name: result.carinfo.car_name,
                        car_year: result.carinfo.car_year,
                        car_buytime: result.carinfo.car_buytime,
                        car_km: result.carinfo.car_km,
                        car_fuel: result.carinfo.car_fuel,
                        car_gear: result.carinfo.car_gear,
                        car_size: result.carinfo.car_size,
                        car_sellarea: result.carinfo.car_sellarea,
                        car_cc: Number(result.carinfo.car_cc),
                        car_color: result.carinfo.car_color,
                        car_tax_count: Number(result.carinfo.car_tax_count),
                        car_seize_count: Number(result.carinfo.car_seize_count),
                        car_security_count: Number(result.carinfo.car_security_count),
                        car_accident_count: Number(result.carinfo.car_accident_count),
                        car_flood_count: Number(result.carinfo.car_flood_count),
                        car_change_using_count: Number(result.carinfo.car_change_using_count),
                        car_change_owner_count: Number(result.carinfo.car_change_owner_count),
                        car_broken: Number(result.carinfo.car_broken),
                        car_option_sunloop: Number(result.carinfo.car_option_sunloop),
                        car_option_wheel: Number(result.carinfo.car_option_wheel),
                        car_option_navi: Number(result.carinfo.car_option_navi),
                        car_option_light: Number(result.carinfo.car_option_light),
                        car_option_parkingsensor: Number(result.carinfo.car_option_parkingsensor),
                        car_option_leatherseat: Number(result.carinfo.car_option_leatherseat),
                        car_option_hotseat: Number(result.carinfo.car_option_hotseat),
                        car_option_airbag: Number(result.carinfo.car_option_airbag),
                        car_option_highpass: Number(result.carinfo.car_option_highpass),
                        car_option_wiper: Number(result.carinfo.car_option_wiper),
                        car_option_smartkey: Number(result.carinfo.car_option_smartkey),
                        car_option_autoside: Number(result.carinfo.car_option_autoside),
                        car_option_coolseat: Number(result.carinfo.car_option_coolseat),
                        car_option_tpms: Number(result.carinfo.car_option_tpms),
                        car_option_bluetooth: Number(result.carinfo.car_option_bluetooth),
                        car_option_hothandle: Number(result.carinfo.car_option_hothandle),
                        car_option_aeb: Number(result.carinfo.car_option_aeb),
                        car_option_ldsw: Number(result.carinfo.car_option_ldsw),
                        car_option_cruise: Number(result.carinfo.car_option_cruise),
                        car_option_autotrunk: Number(result.carinfo.car_option_autotrunk),
                        car_sell_price: Number(result.carinfo.car_sell_price)
                  }, {
                        withCredentials: true
                  });
                  console.log(response);

            } catch (error) {
                  console.error(error);
            }
            setLoading(false);
            toMain();

      }
      const logOut = () => {
            sessionStorage.clear();
            navigate("/");     
      }

     
 


      //console.log(values);
      return (
            <div>
                  

                  <div className="InfoContainer">
                        <form onSubmit={onSubmit} >
                              {counts === 0 &&
                              <div>
                                    <img className="priceintro" src={priceintro} />
                                    <button className="startbutton" onClick={addCount}>시작하기</button>
                              </div>
                              
                              }
                              {counts === 1 &&
                                    
                                    <div className="whole">
                                          <div className="userbox">
                                                <div className='currentuser'>{id}</div>
                                                <div> 님 로그인 중</div>
                                                <button className='logout' onClick={logOut}>로그아웃</button>
                                          </div>     
                                          <Logo />
                                    
                                          <div><input
                                                className="car_num"
                                                name="car_num"
                                                type="text"
                                                placeholder="차량번호"
                                                value={values.car_num}
                                                onChange={onChange}
                                          /></div>
                                          <div><input
                                                className="car_buy_price"
                                                name="car_buy_price"
                                                type="number"
                                                placeholder="출고가"
                                                value={values.car_buy_price}
                                                onChange={onChange}
                                          /></div>
                                          <div><input
                                                className="car_company"
                                                name="car_company"
                                                type="text" placeholder="제조사"
                                                value={values.car_company}
                                                onChange={onChange}
                                          /></div>
                                          <div><input
                                                className="car_name"
                                                name="car_name"
                                                type="text"
                                                placeholder="모델명"
                                                value={values.car_name}
                                                onChange={onChange}
                                          /></div>
                                          <div><input
                                                className="car_year"
                                                name="car_year"
                                                type="text" placeholder="연형(ex. 2009 년형 → 09 입력)"
                                                value={values.car_year}
                                                onChange={onChange}
                                          /></div>
                                          <div> <input /* date 형식 추가 수정 */
                                                className="car_buytime"
                                                name="car_buytime"
                                                type="date"
                                                placeholder="구매 일자"
                                                value={values.car_buytime}
                                                onChange={onDateHandler}
                                          /></div>
                                          <div><input
                                                className="car_km"
                                                name="car_km"
                                                type="number" placeholder="주행거리(km)"
                                                value={values.car_km}
                                                onChange={onChange}
                                          /></div>

                                          <select
                                                className="car_fuel"
                                                name="car_fuel"
                                                placeholder="연료종류"
                                                defaultValue="연료 선택"
                                                onChange={onSelectHandler}
                                          >
                                                <option value="" >연료 선택</option>
                                                <option value="가솔린" >가솔린</option>
                                                <option value="디젤">디젤</option>
                                                <option value="CNG">CNG</option>
                                                <option value="LPG">LPG</option>
                                                <option value="전기">전기</option>
                                                <option value="하이브리드(가솔린)">하이브리드(가솔린)</option>
                                                <option value="하이브리드(디젤)">하이브리드(디젤)</option>
                                                <option value="하이브리드(LPG)">하이브리드(LPG)</option>
                                          </select>
                                          <select
                                                className="car_gear"
                                                name="car_gear"
                                                placeholder="변속기어 종류"
                                                defaultValue="기어 선택"
                                                onChange={onSelectHandler}
                                          >
                                                <option value="">기어 선택</option>
                                                <option value="오토">오토</option>
                                                <option value="수동">수동</option>
                                                <option value="CVT">CVT</option>
                                                <option value="SAT">SAT</option>
                                          </select>
                                          <select
                                                className="car_size"
                                                name="car_size"
                                                placeholder="차량 종류"
                                                defaultValue="차량 종류 선택"
                                                onChange={onSelectHandler}
                                          >
                                                <option value="">차량종류 선택</option>
                                                <option value="RV">RV</option>
                                                <option value="SUV">SUV</option>
                                                <option value="경차">경차</option>
                                                <option value="소형">소형</option>
                                                <option value="중형">중형</option>
                                                <option value="준중형">준중형</option>
                                                <option value="대형">대형</option>
                                                <option value="승합">승합</option>
                                                <option value="스포츠카">스포츠카</option>
                                          </select>
                                          <select
                                                className="car_sellarea"
                                                name="car_sellarea"
                                                placeholder="판매 예상지역"
                                                defaultValue="판매될 예상 지역"
                                                onChange={onSelectHandler}
                                          >
                                                <option value="1">판매예상지역 선택</option>
                                                <option value="서울">서울</option>
                                                <option value="경기">경기</option>
                                                <option value="인천">인천</option>
                                                <option value="강원">강원</option>
                                                <option value="대전">대전</option>
                                                <option value="충남">충남</option>
                                                <option value="충북">충북</option>
                                                <option value="광주">광주</option>
                                                <option value="전남">전남</option>
                                                <option value="전북">전북</option>
                                                <option value="대구">대구</option>
                                                <option value="경남">경남</option>
                                                <option value="경북">경북</option>
                                                <option value="울산">울산</option>
                                                <option value="부산">부산</option>
                                                <option value="제주">제주</option>
                                          </select>
                                          <div><input
                                                className="car_cc"
                                                name="car_cc"
                                                type="number"
                                                placeholder="배기량 cc"
                                                value={values.car_cc}
                                                onChange={onSelectHandler}
                                          /></div>
                                          <div><input
                                                className="car_color"
                                                name="car_color"
                                                type="text"
                                                placeholder="차량 색상"
                                                value={values.car_color}
                                                onChange={onChange}
                                          /></div>
                                          <button  className="nextbutton"onClick={addCount}>다음</button>
                                    </div>
                              }

                              {counts === 2 &&
                                    <div > 
                                    <div className="userbox">
                                                <div className='currentuser'>{id}</div>
                                                <div> 님 로그인 중</div>
                                                <button className='logout' onClick={logOut}>로그아웃</button>
                                          </div> 
                                    <div className="pageholder">
                                          
                                          <div>
                                                <h6>체납 횟수</h6>
                                                <div className="inputintro">차량에 관련된 세금을 기한까지 내지 못한 경우의 횟수 </div>
                                                <input
                                                className="car_tax_count"
                                                name="car_tax_count"
                                                type="number"
                                                placeholder="체납 횟수"
                                                value={values.car_tax_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                          <h6>압류 횟수</h6>
                                                <div className="inputintro">해당 차량에 관련되어 압류된 경우의 횟수 </div>
                                                <input
                                                className="car_seize_count"
                                                name="car_seize_count"
                                                type="number"
                                                placeholder="압류 횟수"
                                                value={values.car_seize_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                                <h6>저당 횟수</h6>
                                                <div className="inputintro">해당 차량으로 채무에 담보로 잡은 경우의 횟수 </div>
                                                <input
                                                className="car_security_count"
                                                name="car_security_count"
                                                type="number" placeholder="저당 횟수"
                                                value={values.car_security_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                                <h6>사고 횟수</h6>
                                                <div className="inputintro">해당 차량으로 사고처리된 경우의 횟수 </div>
                                                <input
                                                className="car_accident_count"
                                                name="car_accident_count"
                                                type="number"
                                                placeholder="사고 횟수"
                                                value={values.car_accident_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                                <h6>침수 횟수</h6>
                                                <div className="inputintro">해당 차량으로 침수 사고처리된 경우의 횟수 </div>
                                                <input
                                                className="car_flood_count"
                                                name="car_flood_count"
                                                type="number" placeholder="침수 횟수"
                                                value={values.car_flood_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                                <h6>용도이력 변경횟수</h6>
                                                <div className="inputintro">해당 차량의 용도이력이 변경된  횟수 </div>
                                                <input
                                                className="car_change_using_count"
                                                name="car_change_using_count"
                                                type="number"
                                                placeholder="용도이력 변경횟수"
                                                value={values.car_change_using_count}
                                                onChange={onChange}
                                          /></div>
                                          <div>
                                                <h6>사용자 변경 횟수</h6>
                                                <div className="inputintro">해당 차량의 사용자 변경된 횟수 </div>
                                                <input
                                                className="car_change_owner_count"
                                                name="car_change_owner_count"
                                                type="number"
                                                placeholder="사용자 변경횟수"
                                                value={values.car_change_owner_count}
                                                onChange={onChange}
                                          /></div>
                                          <div><h5>전손이력<div className="radiointro">차량에 피해 금액이 보험사에서 책정한 차량 가액을 넘어서는 경우 </div></h5>
                                                <div className="radiobox">
                                                <div className="radiolabel">YES
                                                <input
                                                      className="car_broken"
                                                      name="car_broken"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                /></div>
                                                
                                                
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_broken"
                                                      name="car_broken"
                                                      type="radio"
                                                      value="0"
                                                      label="NO"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                </div>
                                          </div>
                                         
                                          <button className="nextbutton" onClick={addCount}>다음</button>
                                    </div>
                              </div>
                              }
                              {counts === 3 &&
                                    <div>
                                          <div className="userbox">
                                                <div className='currentuser'>{id}</div>
                                                <div> 님 로그인 중</div>
                                                <button className='logout' onClick={logOut}>로그아웃</button>
                                          </div> 
                                          <div className="pageholder"> 
                                          <div><h5>썬루프</h5>
                                                <div className="radiobox">
                                                <div className="radiolabel">YES
                                                <input
                                                      className="car_option_sunloop"
                                                      name="car_option_sunloop"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_sunloop"
                                                      name="car_option_sunloop"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                </div>
                                          </div>
                                          <div><h5>알루미늄휠</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_wheel"
                                                      name="car_option_wheel"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_wheel"
                                                      name="car_option_wheel"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                </div>
                                          </div>
                                          <div><h5>내비게이션</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_navi"
                                                      name="car_option_navi"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_navi"
                                                      name="car_option_navi"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                </div>
                                          </div>
                                          <div><h5>오토라이트</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_light"
                                                      name="car_option_light"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_light"
                                                      name="car_option_light"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>주차감지센서</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_parkingsensor"
                                                      name="car_option_parkingsensor"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_parkingsensor"
                                                      name="car_option_parkingsensor"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>가죽시트</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_leatherseat"
                                                      name="car_option_leatherseat"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_leatherseat"
                                                      name="car_option_leatherseat"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>열선시트</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_hotseat"
                                                      name="car_option_hotseat"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_hotseat"
                                                      name="car_option_hotseat"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>사이드,커튼에어백</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_airbag"
                                                      name="car_option_airbag"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_airbag"
                                                      name="car_option_airbag"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>하이패스룸밀러</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_highpass"
                                                      name="car_option_highpass"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_highpass"
                                                      name="car_option_highpass"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>레인선서와이퍼</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_wiper"
                                                      name="car_option_wiper"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_wiper"
                                                      name="car_option_wiper"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>스마트키</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_smartkey"
                                                      name="car_option_smartkey"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_smartkey"
                                                      name="car_option_smartkey"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>전동접이사이드미러</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_autoside"
                                                      name="car_option_autoside"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_autoside"
                                                      name="car_option_autoside"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>통풍시트</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_coolseat"
                                                      name="car_option_coolseat"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_coolseat"
                                                      name="car_option_coolseat"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>타이어공기압장치(TPMS)</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_tpms"
                                                      name="car_option_tpms"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_tpms"
                                                      name="car_option_tpms"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>블루투스</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_bluetooth"
                                                      name="car_option_bluetooth"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_bluetooth"
                                                      name="car_option_bluetooth"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>핸들열선</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_hothandle"
                                                      name="car_option_hothandle"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_hothandle"
                                                      name="car_option_hothandle"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>자동긴급제동(AEB)</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_aeb"
                                                      name="car_option_aeb"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_aeb"
                                                      name="car_option_aeb"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>차선이탈경보(LDSW)</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_ldsw"
                                                      name="car_option_ldsw"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_ldsw"
                                                      name="car_option_ldsw"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>크루즈컨트롤</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_cruise"
                                                      name="car_option_cruise"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_cruise"
                                                      name="car_option_cruise"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          <div><h5>전동트렁크</h5>
                                          <div className="radiobox">
                                          <div className="radiolabel">YES
                                                <input
                                                      className="car_option_autotrunk"
                                                      name="car_option_autotrunk"
                                                      type="radio"
                                                      value="1"
                                                      onChange={onChange}
                                                />
                                                </div>
                                                <div className="radiolabel">NO
                                                <input
                                                      className="car_option_autotrunk"
                                                      name="car_option_autotrunk"
                                                      type="radio"
                                                      value="0"
                                                      onChange={onChange}
                                                />
                                                </div>
                                          </div>
                                          </div>
                                          
                                          <button className="finishbutton" type="submit" onSubmit={onSubmit} >AI 분석 시작하기</button>
                                          
                                    </div>
                              </div>
                              }
                        </form>
                        {counts === 4 &&
                        <div>
                              <div className="userbox">
                                                <div className='currentuser'>{id}</div>
                                                <div> 님 로그인 중</div>
                                                <button className='logout' onClick={logOut}>로그아웃</button>
                                          </div> 
                              <div className='pageholder'>
                                    <img className="resultimage" src={resultimage} />
                                    
                                          
                                
                                     
                                     <p className="resulttitle">차칸 예상시세</p>
                                     <div className="pricebox">
                                     <div className="pricecontrol">최소  <CountUp className="pricenumber" end={result.min} /> 만원 ~
                                     최대   <CountUp className="pricenumber"end={result.max} /> 만원</div>
                                    </div>
                                    <div className="resulttitle">차량번호: {result.carinfo.car_num}</div>
                                    <p className="resulttext">제조사:{result.carinfo.car_company}</p>
                                    <p className="resulttext">차종:{result.carinfo.car_name}</p>
                                    <p className="resulttext">연식:{result.carinfo.car_year}</p>
                                    <p className="resulttext">연료:{result.carinfo.car_fuel}</p>
                                    <p className="resulttext">변속기:{result.carinfo.car_gear}</p>
                                    <p className="resulttext">주행거리:{result.carinfo.car_km}km</p>
                                    <p className="resulttext">색상:{result.carinfo.car_color}</p>
                                    <p className="resulttext">판매 예상 지역:{result.carinfo.car_sellarea}</p>
                                    <div>

                                          <div className="buttonbox">
                                          <button className="finishbutton2"onClick={saveData}>시세분석 리스트 저장</button>
                                          <button className="finishbutton2"onClick={toMain}>메인으로</button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        }
                  </div>
            </div>

      );

};

export default InfoCar;