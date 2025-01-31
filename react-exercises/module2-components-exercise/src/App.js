import React from "react";
import { Component } from 'react';
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar>Navbar</Navbar>
      <HomePage>HomePage</HomePage>
      <Footer>footer</Footer>
    </div>
  );
}

export default App;
