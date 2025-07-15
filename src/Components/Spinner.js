import React, { Component } from 'react'
import './Spinner.css'
export class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container">
      <div className="dot blue"></div>
      <div className="dot red"></div>
      <div className="dot yellow"></div>
    </div>
    )
  }
}

export default Spinner
