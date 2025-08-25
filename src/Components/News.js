import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import './News.css';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News= (props)=>{

  //State variables
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  //document.title=`HawK News -${props.category.charAt(0).toUpperCase()+props.category.slice(1)}`

  

  const  fetchNews = async(page,append=false)=> {

    setLoading(!append);
    setError(null);
    props.setProgress(10);

    try{
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize || 15}`;
      let data=await fetch(url);
      props.setProgress(30);
      let parsedData=await data.json();
      props.setProgress(50);

      if(append){
        setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
      }
      else{
        setArticles(parsedData.articles);
      }
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      setPage(page);
      
    }catch(error){
      setLoading(false);
      setError("Failed to fetch news articles. Please try again later.");
    }
    props.setProgress(100);
  }

  useEffect(() => {
    fetchNews(1);
  },[])
 
  const handleNext=()=>{
    if (page+1>Math.ceil(totalResults/props.pageSize)) {
      setError("You are already on the last page.");
      return;

    }
    fetchNews(page+1);
  }
  
  const handlePrevious=()=>{
    if(page<=1){
      setError("You are already on the first page.");
      return;
    }
    fetchNews(page-1);

  }

  const fetchMoreData = async()=> { 
    
    const nextPage = page + 1;
    if (articles.length >=totalResults) {
      return;
    }
    await fetchNews(nextPage, true);
  }

    
    return (
      <>
        {/* Show spinner only for initial loading */}
        {loading && articles.length === 0 && <Spinner />}
        <h1 className='text-center'>HawK News</h1>
        <h2 className='text-center'>Top {props.category.charAt(0).toUpperCase()+props.category.slice(1)} Headlines</h2>
        
        {/* Show error message if there's an error */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<div className="text-center my-3"><Spinner /></div>}
          endMessage={
            <div className="text-center my-4">
              <p style={{ 
                color: '#062863ff', 
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

News.defaultProps={
    country:"in",
    pageSize:6,
    category:"general"
  }
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

export default News
