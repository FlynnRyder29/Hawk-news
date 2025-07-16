import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import proptypes from 'prop-types';
export class News extends Component {

  static defaultprops={
    country:"in",
    pageSize:6
  }
  // static proptypes={
  //   country:
  // }

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
      error:null,
    };
  }

  async fetchNews(page){
    this.setState({loading:true,error:null});
    try{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=d590dec237464665828f9e1ca2994593&page=${page}&pageSize=${this.props.pageSize || 15}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({
        articles:parsedData.articles||[],
        totalResults:parsedData.totalResults||0,
        loading:false,
        page,
      });
    }catch(error){
      this.setState({loading:false,error:"Failed to fetch news articles. Please try again later."});
    }
  }

  componentDidMount(){
    this.fetchNews(1);
  }
  handleNext=()=>{
    if (this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)) {
      this.setState({
        error: "No more articles available."
      });
      return;

    }
    this.fetchNews(this.state.page+1);
  }
  
  handlePrevious=()=>{
    if(this.state.page<=1){
      this.setState({
        error:"You are already on the first page."
      });
      return;
    }
    this.fetchNews(this.state.page-1);

  }

  render() {
    return (
      <div className='container my-3'>
        {this.state.loading && <Spinner />}
        <h1 className='text-center'>HawK News- Top Headlines</h1>
        <div className="row">
          {!this.state.loading&&this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url||element.title}>
            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage||"https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"} newsUrl={element.url}/>
          </div>
          })}
        </div>

        <div className="news-pagination">
          <button disabled={this.state.page<=1} type="button"
          className='btn btn dark' onClick={this.handlePrevious}>&larr; Previous</button>
            
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/(this.props.pageSize||15))} type="button" className="btn btn dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
