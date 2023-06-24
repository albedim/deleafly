import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import GetStarted from './components/get_started/GetStarted';
import AboutUs from './components/about_us/AboutUs';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header route_name="get_started" /><GetStarted/></>} />
        <Route path="/about" element={<><Header route_name="about_us" /><AboutUs/></>} />
        <Route path="/dashboard" element={<><Header route_name="dashboard" /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
