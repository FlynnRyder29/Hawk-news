import './App.css';
import React, { Component } from 'react'
import { BrowserRouter } from "react-router-dom";
import Navbar from './Components/Navbar';
import News from './Components/News';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navbar />
      <News pageSize={5}/>
      </BrowserRouter>
    )
  }
}

