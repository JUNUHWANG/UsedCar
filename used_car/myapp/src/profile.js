import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/profile.css"

import lottie from "lottie-web"

export const Profile = () => {

const user = sessionStorage.getItem("user");

      const container = useRef(null);
      const [id, setId] = useState(user);
      const [meminfo, setMeminfo] = useState({}); 
      const navigate = useNavigate();
      
      async function signOut() {
            try {
                 
                  const response = await axios.post('/member/out', {
                        id
                  }).then(res => {
                        console.log("from back", res.data)
                        sessionStorage.clear();
                        navigate('/')
                        
                  })
                  console.log(response);
            } catch (error) {
                  console.error(error);
            } 
      } 
      
      const logOut = () => {
            sessionStorage.clear();
            navigate("/");     
      }

      useEffect(() => {
            
            
                  lottie.loadAnimation({
                  container: container.current,
                  renderer: "svg",
                  loop: false,
                  autoplay: true,
                  animationData: require('./asset/profilelogo.json'),
                  rendererSettings: {
                        clearCanvas: true,
                  }
            });
            // 정보 불러오기
            try {
                   axios.post('/member/myinfo', {
                        id
                  }).then(res => {
                        console.log("from back", res.data)
                        setMeminfo(JSON.parse(JSON.stringify(res.data)));
                        console.log("next", meminfo)
                        
                  }) 
                  } catch (error) {
                      console.error(error);
                } 

            return () => {
                  lottie.destroy();
            };
      }, []);

      const toMain =() => {
            navigate('/main')
      }

return (
      <div className="page">  
            <div className="userbox">
                  <div className='currentuser'>{id}</div>
                  <div> 님 로그인 중</div>
                  <button className='logout'onClick={logOut}>로그아웃</button>
                  </div>
            <div className="container" ref={container}></div>
            <div className="box">
            <div className="meminfotext">아이디: {meminfo.id}</div>
            <div className="meminfotext">이메일: {meminfo.email}</div>
            <div className="meminfotext">이름: {meminfo.name}</div> 
            </div>
            <button className="finishbutton4" onClick={signOut}>탈퇴</button>
            <button className="finishbutton3" onClick={toMain}> 메인으로</button>
            

      </div>
)
} 

export default Profile;