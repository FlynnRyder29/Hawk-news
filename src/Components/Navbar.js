import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


export class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>

        <div className="dropdown">
          <button className="dropbtn">Category ▾</button>
          <div className="dropdown-content">
            <Link to="/business">Business</Link>
            <Link to="/entertainment">Entertainment</Link>
            <Link to="/general">General</Link>
            <Link to="/health">Health</Link>
            <Link to="/science">Science</Link>
            <Link to="/sports">Sports</Link>
            <Link to="/technology">Technology</Link>
          </div>
        </div>

        <Link to="#">Blog</Link>
        <Link to="#">Portfolio</Link>
        <Link to="#">Contact</Link>

        <div className="animation start-home"></div>
      </nav>

    );
  }
}

export default Navbar;
