import React from 'react';
import PropTypes from 'prop-types';

const Gif = ({ src, id, onGifClick }) => {
  return (
    <img className="Gif fadeIn" src={src} onClick={() => onGifClick(id)} alt="" />
  );
};

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onGifClick: PropTypes.func.isRequired
};

export default Gif;
