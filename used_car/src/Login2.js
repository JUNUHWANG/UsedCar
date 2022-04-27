import React, { useState   } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import "./css/Login.css";
import axios from 'axios';
import CountUp from 'react-countup';

function Login2() {
      //hover 이벤트
      const [hover, setHover] = useState(false);

      //history 사용
      const navigate = useNavigate();

      // context 전역변수활용
     /*  const { store, actions } = useContext(context);  */

      // state 정보
      const [id, setId] = useState("");
      const [password, setPassword] = useState(""); 
      
      // token 저장 = session 과 동일
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");
      console.log("your Token is", token);

      // input창 내용 입력시 반응
      const onIdHandler = (event) => {
        setId(event.currentTarget.value);
      }
      const onPasswordHandler = (event) => {
            setPassword(event.currentTarget.value)
      }


      const login = () => {
            try {
                  console.log(id)
                  const response =  axios.post('/member/token', {
                        id: id,
                        password: password
                        //여기를 서버와 맞춰줘야함.
                  
                  }).then(res => {
                        console.log("from back", res.data)
                        sessionStorage.setItem("token", res.data.access_token)
                        sessionStorage.setItem("user", res.data.curr_user)
                        
                        navigate('/main')
                        return true;
                  })
                  console.log(response);
                  navigate('/');
            } catch (error) {
                  console.error(error);
            }
      }

      const toJoin = () => {
            navigate('/join')
      }

      // submit 이벤트 정의
      const onSubmit = (event) => {
            event.preventDefault();
            console.log(id, password);
            login(id, password)
      };

      

      return (
            <>
                  <Logo />

                  {token && token!="" && token != undefined && token != null ? (
                        <div></div> ) : (
                        <div className="loginregister">
                              <form onSubmit={onSubmit}>
                                    <div><input 
                                                className="Id" 
                                                type="text" placeholder="아이디" 
                                                value={id} 
                                                onChange={onIdHandler}
                                                /></div>
                                    <div><input 
                                                className="password" 
                                                type="password" 
                                                placeholder="비밀번호" 
                                                value={password} 
                                                onChange={onPasswordHandler} 
                                                /></div>
                                    <div>
                                                <div>
                                                      <button type="submit"
                                                            onSubmit={onSubmit}
                                                            onMouseEnter={() => setHover(true)}
                                                            onMouseLeave={() => setHover(false)}
                                                            className={hover ? "loginbutton" : "loginbutton2"}> 로그인</button>
                                                </div>
                                                </div>
                              </form>
                              <button onClick={toJoin} className="joinbutton">회원가입</button>
                        </div>
                        )
                  }
            </>     
      )
};
export default Login2;
