import React,  { useEffect, useRef, Component } from "react"
import logo from './asset/mainlogo.gif'
import textlogo from './asset/textlogo.svg'
import  './css/Logo.css';

function Logo() {

      return (
            <>
                  <div className="movinglogocontainer">
                        <img className="movinglogo" src={logo} />
                  </div>
                  
                  <img className="textlogo" src= {textlogo} />
            </>
      );
}

export default Logo;



