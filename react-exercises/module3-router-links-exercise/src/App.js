import React from "react";
import { Component } from 'react';
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import Pricing from "./components/Pricing.jsx";
import Features from "./components/Features.jsx";
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
       <Navbar>Navbar</Navbar>
      <Routes>
        <Route path="/" element= { <HomePage/> }></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/features" element={<Features />}></Route>

      </Routes>
      <Footer>footer</Footer>
    </div>
  );
}

export default App;
