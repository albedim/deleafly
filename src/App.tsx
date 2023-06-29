import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import GetStarted from './components/get_started/GetStarted';
import AboutUs from './components/about_us/AboutUs';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Stats from './components/stats/Stats';
import ShortedUrl from './components/shorted_url/ShortedUrl';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header route_name="get_started" /><GetStarted/></>} />
        <Route path="/:shorted_url/stats" element={<><Header route_name="dashboard" /><Stats/></>} />
        <Route path="/:shorted_url" element={<><ShortedUrl/></>} />
        <Route path="/about" element={<><Header route_name="about_us" /><AboutUs/><Footer/></>} />
        <Route path="/dashboard" element={<><Header route_name="dashboard" /><Dashboard/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
