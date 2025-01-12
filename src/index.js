import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import Signup from './Signup';

export default function Index(){
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL="http://127.0.0.1:8000"
  // DisableDevtool();

  return(
    <HashRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  </HashRouter>
  )
};
const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<Index/>)

