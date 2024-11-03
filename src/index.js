import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import axios from 'axios';
import Login from './Login';
import Game from './Game';
import Footer from './Footer';
import Audio from './component/Audio';

export default function Main(){
  axios.defaults.withCredentials=true;
  axios.defaults.baseURL="http://127.0.0.1:8000"
return(
  <HashRouter>
    <Audio/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/game' element={<Game/>}/>
      <Route path='/josh' element={<Footer/>}/>
    </Routes>
  </HashRouter>
)

}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Main/>);

reportWebVitals();
