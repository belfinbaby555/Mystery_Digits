import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import axios from 'axios';
import Login from './Login';
import Game from './Game';
import Audio from './component/Audio';
import DisableDevtool from 'disable-devtool';

export default function Main(){
  axios.defaults.withCredentials=true;
 

  DisableDevtool();
return(
  <HashRouter>
    <Audio/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/game' element={<Game/>}/>
    </Routes>
  </HashRouter>
)

}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Main/>);

reportWebVitals();
