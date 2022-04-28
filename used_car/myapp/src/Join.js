import React, { useState, useRef, useEffect } from 'react';
import "./css/join.css"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import lottie from "lottie-web"
import "./asset/font/font.css"
import FormInput from './FormInput';
import './css/FormInput.css';
import './css/join.css';
import axios from "axios";
import ReactDOM from "react-dom";


const Join = () => {
      const navigate = useNavigate();
      
      const container = useRef(null)

      const [id, setId] = useState("");
      const [password, setPassword] = useState("");
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");

      const onIdHandler = (event) => {
            setId(event.currentTarget.value);
      }
      const onPasswordHandler = (event) => {
            setPassword(event.currentTarget.value)
      }
      const onNameHandler = (event) => {
            setName(event.currentTarget.value);
      }
      const onEmailHandler = (event) => {
            setEmail(event.currentTarget.value);
      }



      async function postData() {
            try {
                  const response = await axios.post('/member/join', {
                        id: id,
                        name: name,
                        password: password,
                        email: email
                        //여기를 서버와 맞춰줘야함.
                  }, {
                        withCredentials: true
                  } );
                  console.log(response);
                 

            } catch (error) {
                  console.error(error);
            }
      }

      const onSubmit = (event) => {
            event.preventDefault();
            console.log(id, name, password, email);
            postData();
            navigate('/')
      }

      useEffect(() => {
            lottie.loadAnimation({
                  container: container.current,
                  renderer: "svg",
                  loop: 1,
                  autoplay: true,
                  animationData: require('./asset/joinlogo.json'),
                  rendererSettings: {
                        clearCanvas: true,
                      }
            });
            return ()=> {
                  lottie.destroy();
            };
      }, []); 



      return (
            <>
                  <div className="container" ref={container}></div>
                  <h3 className="title">회원가입</h3>
                  <form onSubmit={onSubmit}>
                        <div><input
                              className="Id"
                              type="text" placeholder="Id"
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
                        <div><input
                              className="name"
                              type="text"
                              placeholder="이름"
                              value={name}
                              onChange={onNameHandler}
                               /></div>
                        <div><input
                              className="email"
                              type="email"
                              placeholder="이메일"
                              value={email}
                              onChange={onEmailHandler}
                              /></div>
                        <div className="buttonbox"><button type="submit"
                              onSubmit={onSubmit}
                              className="finishbutton3"
                              >회원가입</button></div>
                  </form>
            
            </>


      );

}
export default Join;
