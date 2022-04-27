import './App.css';
import React from 'react';
import "./asset/font/font.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from './Join';
import Login2 from './Login2';
import InfoCar from './InfoCar';
import Main from './Main';
import Profile from './profile';
import CarinfoDetail from './Carinfodetail';
import Result from './Result';
/* import Login from './components/Login';

import Join from './Join';
import InfoCar2 from './InfoCar2';
import InfoCar3 from './InfoCar3';
 */

function App() {
  return (
    
    <BrowserRouter>
    <div className="App">


        <Routes>
            <Route path="/" element={<Login2 />}/>
            <Route path="/join" element={<Join />}/>
            
            <Route path="/main" element={<Main />}/>
            <Route path="/infocar" element={<InfoCar />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/carinfodetail" element={<CarinfoDetail />}/>
            
        </Routes>

    </div>
    </BrowserRouter>

  );
}


export default App;
