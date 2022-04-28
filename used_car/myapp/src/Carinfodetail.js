import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import resultimage from './asset/resultimage.svg'
import kbimage from './asset/kbimage.png'
import CountUp from 'react-countup';
import "./css/carinfodetail.css"

const CarinfoDetail = () => {
    const [carinfos, setCarinfos] = useState([{}]);
    const [maxprice, setMaxprice] = useState(0);
    const [minprice, setMinprice] = useState(0);
    const [filterdata, setFilterdata] = useState([])


    const navigate = useNavigate();
    const location = useLocation();
    const number = location.state.data;
    const user = sessionStorage.getItem("user");
    const [cid, setId] = useState(user);


    const formData = [
        { id: 1, name: "가격" },
         { id: 2, name: "차종" }, 
         { id: 3, name: "연형" }, 
         { id: 4, name: "주행거리" }
    ]
    //const [isChecked, setIsChecked] = useState(false); //체크여부
    //const [checkedItems, setCheckedItems] = useState([]);
    const [checkedInputs, setCheckedInputs] = useState([]);


    const changeHandler = (checked, id) => { 
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
            } else {
                setCheckedInputs(checkedInputs.filter((el)=> el !== id));
            }
    };

 /*    const checkedItemHandler = (box, id, isChecked) => { if (isChecked) { 
        //체크 되었을때 
        checkedItems.add(id); //체크시 삽입 
        
        setCheckedItems(checkedItems); //체크 요소 넣어주기 
    } else if (!isChecked && checkedItems.has(id)) { //체크가 안되었고, id가 있을때(클릭 2번시) 
        checkedItems.delete(id); //체크 두번시 삭제 
        setCheckedItems(checkedItems); box.style.backgroundColor = "#fff";
        
        console.log(checkedItems);
     }
    return checkedItems; 
    
}; */

    



    const toMain =() => {
        navigate('/main')
  }

    useEffect(() => {
             
        try {
            
            axios.get('/carinfo/detail/', {params: {number : number}}  ) // 1대신 숫자 int
                .then(
                    res => {
                        setCarinfos(JSON.parse(JSON.stringify(res.data.carinfo)))
                        setFilterdata(res.data.filter_data)
                        setMaxprice(res.data.max)
                        setMinprice(res.data.min)
                        //console.log(res.data)
                        console.log(res.data.carinfo)
                        console.log(res.data.filter_data)
                        console.log(res.data.max)
                    }
                ) 
            } catch (error) {
                console.error(error);
          }        
                },[]);


                const logOut = () => {
                    sessionStorage.clear();
                    navigate("/");     
              }

              const onSubmit = (event) => {
                event.preventDefault();
                sendData()
              }
              const postpagenum = number

              async function sendData() {
                try {
                    
                    console.log("front", checkedInputs, number)
                        
                      axios.post('/carinfo/detail/' + postpagenum, {
                        filter_list : checkedInputs,
                        carinfono: number
                      })
                      .then(
                        res => {
                            //console.log("fromback" ,res.data)
                            //console.log("필터 데이터", res.data.filter_data)
                            setFilterdata(res.data.filter_data)
                            //console.log("저장후 필터 데이터" , filterdata)
                            //console.log(res.data.filter_data)
                           
                        }
                    )   
                } catch (error) {
                      console.error(error);
                }
          }



         const nameList = filterdata && filterdata.map((data) => <li className="list3"> {data[10]} {data[9]}년형 /  {data[1]}만원  <Link  className='link' to= {"//www.kbchachacha.com/public/car/detail.kbc?carSeq=" + data[0]}  target="_blank">바로가기</Link><br/> <div className="listinfo"> 주행거리:  {data[3]}km  출시일: {data[2]} </div></li>)
         /* const infoList = carinfos && carinfos.map((carinfo) => <li>id:{carinfo.id} <br/>차량번호:{carinfo.car_num}<br/></li>)  */
              /* <div> {infoList} </div> */
    return (
        <div>
            <div className="userbox">
                  <div className='currentuser'>{cid}</div>
                  <div> 님 로그인 중</div>
                  <button className='logout'onClick={logOut}>로그아웃</button>
                  </div>

            <div className="pageholder">
                
                <img className="resultimage" src={resultimage} />
                
                <div className="list_head2">NO. {number}  {carinfos[0].car_name}  {carinfos[0].car_num}</div>
                <div className="pricebox">
                                     <div className="pricecontrol">최소  <CountUp className="pricenumber" end={minprice} /> 만원 ~
                                     최대   <CountUp className="pricenumber"end={maxprice} /> 만원</div>
                                    </div>
                                    <div>{carinfos.car_num}</div>
                                    <div className="resulttitle">차량번호: {carinfos[0].car_num}</div>
                                    <p className="resulttext">제조사:{carinfos[0].car_company}</p>
                                    <p className="resulttext">차종:{carinfos[0].car_name}</p>
                                    <p className="resulttext">연식:{carinfos[0].car_year}</p>
                                    <p className="resulttext">연료:{carinfos[0].car_fuel}</p>
                                    <p className="resulttext">변속기:{carinfos[0].car_gear}</p>
                                    <p className="resulttext">주행거리:{carinfos[0].car_km}km</p>
                                    <p className="resulttext">색상:{carinfos[0].car_color}</p>
                                    <p className="resulttext">판매 예상 지역:{carinfos[0].car_sellarea}</p>
                <div className="list2Container">
                    <img className="kbimage" src={kbimage} />
                    <div>
                        <form onSubmit={onSubmit}>
                        {formData.map((item) => ( 
                        <label key={item.id} className="innerBox">
                             <input 
                             className="checkinput"
                             id={item.name}
                            type="checkbox"
                            value={item.name} 
                            onChange={(e)=>{
                                changeHandler(e.currentTarget.checked, item.name)
                              }}
                              checked={checkedInputs.includes(item.name) ? true : false}
                             /> 
                             <div className="checkinputlabel">{item.name}</div>
                             </label>
                        ))}
                            <button className="checkbutton" type="submit" onClick={onSubmit}>조건검색</button>
                        </form>
                    </div>
                    <div className="list2"> {nameList} </div>
                </div>
                <div className="btnContainer">
                    <button className="finishbutton3" onClick={toMain}>뒤로가기</button>
                </div>

            </div>



        </div>
    );
}

export default CarinfoDetail;