import React from 'react';
import PropTypes from 'prop-types';

const GifDetail = ({ title, originalSrc, userName, uploadTime, onClose }) => {
  return (
    <div className="GifDetail fadeIn">
      <div className="GifDetail__panel">
        <i className="GifDetail__close fa fa-times fa-2x" onClick={() => onClose()} aria-hidden="true"></i>
        { title &&
          <h2 className="GifDetail__title">{title}</h2>
        }
        <img className="GifDetail__img" src={originalSrc} alt={title} />
        <p className="GifDetail__text GifDetail__text--username">By {userName}</p>
        <p className="GifDetail__text GifDetail__text--upload">Uploaded on: {uploadTime}</p>
      </div>
    </div>
  );
};

GifDetail.defaultProps = {
  userName: 'unknown user',
  uploadTime: 'unknown date'
};

GifDetail.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  userName: PropTypes.string,
  uploadTime: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default GifDetail;
