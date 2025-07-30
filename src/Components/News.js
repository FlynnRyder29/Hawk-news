import React, { Component } from 'react'
import Newsitem from './Newsitem'
import './News.css';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps={
    country:"in",
    pageSize:6,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
      error:null,
    };
    document.title=`HawK News -${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)}`
  }

  async fetchNews(page,append=false) {
    this.setState({loading:!append,error:null});
    try{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d590dec237464665828f9e1ca2994593&page=${page}&pageSize=${this.props.pageSize || 15}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState(prevState =>({
        articles:append? [...prevState.articles, ...parsedData.articles] : parsedData.articles,
        totalResults:parsedData.totalResults||0,
        loading:false,
        page,
      }));
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

  fetchMoreData = async()=> { 
    
    const nextPage = this.state.page + 1;
    if (this.state.articles.length >= this.state.totalResults) {
      return;
    }
    await this.fetchNews(nextPage, true);
  }

  render() {
    const { articles, loading, error, totalResults } = this.state;
    
    return (
      <>
        {/* Show spinner only for initial loading */}
        {loading && articles.length === 0 && <Spinner />}
        <h1 className='text-center'>HawK News</h1>
        <h2 className='text-center'>Top {this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headlines</h2>
        
        {/* Show error message if there's an error */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<div className="text-center my-3"><Spinner /></div>}
          endMessage={
            <div className="text-center my-4">
              <p style={{ 
                color: '#ca9204', 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                fontFamily: 'Times New Roman, serif'
              }}>
                📰 You've reached the end of today's headlines! 📰
              </p>
            </div>
          }
        >
        <div className='container my-3'>  
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={`${element.url}-${index}` || `${element.title}-${index}`}>
                  <Newsitem 
                    title={element.title ? element.title.slice(0,45) : ""} 
                    description={element.description ? element.description.slice(0,88) : ""} 
                    imageUrl={element.urlToImage || "https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"} 
                    newsUrl={element.url} 
                    author={element.author} 
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    
    )
    
  }
}

export default News
