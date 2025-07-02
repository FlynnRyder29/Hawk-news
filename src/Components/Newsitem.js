import React, { Component } from 'react';
import './Newsitem.css';
import PropTypes from 'prop-types';

export class Newsitem extends Component {
  render() {
    const { title, description, imageUrl } = this.props;

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
          <h5 className="card-title">{title || 'No Title'}</h5>
          <p className="card-text">{description || 'No Description Available.'}</p>
        </div>
      </div>
    );
  }
}

Newsitem.defaultProps={
  title:'No Title Available',
  description:'No Description Available',
  imageUrl:'https://via.placeholder.com/150'
}
Newsitem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Newsitem;