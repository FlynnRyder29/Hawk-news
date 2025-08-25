import './Newsitem.css';
import PropTypes from 'prop-types';




const Newsitem=(props)=>{

    const { title, description, imageUrl,newsUrl,author,date } = props;

    return (
      <div className="news-card">
        <div className="image-container">
          <img
            src={imageUrl || 'https://via.placeholder.com/150'}
            className="card-img-top"
            alt={title || 'News'}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title || 'No Title'}...</h5>
          <p className="card-text">{description || 'No Description Available.'}...</p>
          <hr/>
          <p className="card-text"><small className="text-muted">Last updated by {author?author:"Unknown"} on {date && ` on ${new Date(date).toUTCString()}`}</small></p>
          <a href={newsUrl || '#'} className="btn-readmore" target="_blank" rel="noopener noreferrer" aria-label={`Read more about ${title || 'this news'}`}>Read More</a>
        </div>
      </div>
    );
}

Newsitem.defaultProps={
  title:'No Title Available',
  description:'No Description Available',
  imageUrl:'https://via.placeholder.com/150'
}
Newsitem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string
};

export default Newsitem;