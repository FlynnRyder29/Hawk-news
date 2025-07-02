import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


export class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link to="#">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Blog</Link>
        <Link to="#">Portfolio</Link>
        <Link to="#">Contact</Link>
        <div className="animation start-home"></div>
      </nav>
    );
  }
}

export default Navbar;
