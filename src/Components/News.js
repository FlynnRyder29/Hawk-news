import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
      <div className='container my-3'>
        <h2>HawK News- Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <Newsitem title="Latest News" description="Senbo Zakura" imageUrl="https://wallpapercave.com/wp/wp15382098.jpg"/>
          </div>
          <div className="col-md-4">
            <Newsitem title="Latest News" description="Senbo Zakura" imageUrl="https://wallpapercave.com/wp/wp15382098.jpg"/>
          </div>
          <div className="col-md-4">
            <Newsitem title="Latest News" description="Senbo Zakura" imageUrl="https://wallpapercave.com/wp/wp15382098.jpg"/>
          </div>
        </div>
      </div>
    )
  }
}

export default News
