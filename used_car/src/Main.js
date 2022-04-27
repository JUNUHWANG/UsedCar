import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/main.css"
import CountUp from 'react-countup';
import lottie from "lottie-web"
import listintro from './asset/listintro.svg'



export const Main = ({ navigation }) => {

      const container = useRef(null)

      const user = sessionStorage.getItem("user");
      const [id, setId] = useState(user);
      const navigate = useNavigate();

      const [meminfo, setMeminfo] = useState(null);

      const [mylist, setMylist] = useState([{}]);

      const [listOn, setListOn] = useState(0);
;

/*       const myList = () => {
            axios.get('/carinfo/mycarinfolist',{
                  id
            }
             
            )
            .then((res)=> {
                  console.log(res.data)
                   setMylist(res.data)
            })
          }
 */

  /*      async function myList() {
            const url = "/carinfo/mycarinfolist";
            axios({
                  method: 'get',
                  url: url,
                  params: {
                        id : id
                  },
                })
                  .then(function (response) {
                    setMylist(response.data)
                  });
        } */ 
        


         async function myList() {
            try {
                 
                  const response = await axios.post('/carinfo/mycarinfolist', {
                        id: id,
                        

                  }).then(res => {
                        console.log("from back", res.data);
                        //console.log(JSON.stringify(res.data));
                        //setMylist(...mylist, res.data)
                        //console.log("res data", res.data)
                        setMylist(JSON.parse(JSON.stringify(res.data.carinfo)));

                        //setMylist(res.data);
                        //console.log(mylist);  
                        //const temp = JSON.parse(mylist)
                        //console.log(temp)
                        //setMylist(temp) 
                        console.log("mylist" , mylist)
                        //console.log("mylist" , JSON.stringify(mylist))
                        setListOn(1);
                        
                        
                  })
                  console.log(response);
            } catch (error) {
                  console.error(error);
            }
      } 
      

       async function myProfile() {
            try {
                 
                  const response = await axios.post('/member/myinfo', {
                        id
                  }).then(res => {
                        console.log("from back", res.data)
                        setMeminfo(res.data)
                        console.log(meminfo)
                        navigate('/profile')
                        
                  })
                  console.log(response);
            } catch (error) {
                  console.error(error);
            } 
      } 

      const moveSearch = () => {
            navigate("/infoCar")
      }

      const logOut = () => {
            sessionStorage.clear();
            navigate("/");     
      }


      
       /* const moveDetail = () => {
            navigate("/Carinfodetail", {
                  state: {
                        number: mylist.carinfo.carinfono
                  },         
            });
            } */

       
      

      useEffect(() => {
            lottie.loadAnimation({
                  container: container.current,
                  renderer: "svg",
                  loop: true,
                  autoplay: true,
                  animationData: require('./asset/infopagelogo.json'),
                  rendererSettings: {
                        clearCanvas: true,
                      }
            });
            return ()=> {
                  lottie.destroy();
            };
      }, []); 



      
      const infoList = mylist && mylist.map((carinfo) => <li className="list"><Link to='/carinfodetail/' className="list_head"state={{ data: carinfo.carinfono}}>NO. {carinfo.carinfono}</Link><br/><div className="carname">{carinfo.car_name} </div>차량번호: <div className="carnum">{carinfo.car_num}</div> 검색날짜 <div className="cardate">{carinfo.car_search_date}</div><br/></li>)
      //const infoList = mylist && mylist.map((carinfo) => <li ><div onClick={moveDetail}>목록번호:{carinfo.carinfono} <br/> id:{carinfo.id} <br/>차량번호:{carinfo.car_num}</div><br/></li>)
return (
      <>
      <div className="App">   
                  <div className="userbox">
                  <div className='currentuser'>{id}</div>
                  <div> 님 로그인 중</div>
                  <button className='logout'onClick={logOut}>로그아웃</button>
                  </div>
                  
                  
                  <div className="container2" ref={container}></div>
                  <button className="buttons" onClick={myProfile}>내정보</button>
                  <button className="buttons"onClick={moveSearch}>차량 예상시세조회</button>
                  <button className="buttons"onClick={myList}>내 차 시세분석 리스트</button>
                  

                  { listOn!== 0 ? (
                        <div className="infolistbox">
                              <img className="listintro" src= {listintro} />
                              <div> {infoList} </div>
                        </div>
                   ) : ( <div></div>) 
                  }
      </div>
      </>
);

}

export default Main;