import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      error:null,
    };
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d590dec237464665828f9e1ca2994593";
    let data = await fetch(url);
    let parsedData=await data.json()
    this.setState({
      articles:parsedData.articles||[],
      loading:false,
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>HawK News- Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url||element.title}>
            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage||"https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"} newsUrl={element.url}/>
          </div>
          })}
        </div>
      </div>
    )
  }
}

export default News
