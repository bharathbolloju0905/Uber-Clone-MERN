import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainSignin from './pages/CaptainSignin';
import Main from './pages/Main';
import CaptainMain from './pages/CaptainMain';
import {Protected} from './pages/Protected';
import './App.css';
import Riding from './pages/Riding';
import Pickup from './pages/Pickup';

const App = () => {
  return (
    <Routes >
    
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/cap-Signup" element={<CaptainSignup/>} />
      <Route path="/cap-Signin" element={<CaptainSignin/>} />
      <Route path="/main" element={ <Protected><Main/></Protected> } />
      <Route path="/riding" element={ <Protected><Riding/></Protected> } />
      <Route path="/cap-main" element={ <Protected><CaptainMain/></Protected> } />
      <Route path="/user-pickup" element={ <Protected><Pickup/></Protected> } />
    </Routes>
  )
}

export default App ;