import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Gif extends Component {
  constructor() {
    super();
    this.state = { 
      imageStatus: 'loading',
      placeHolderColors: [
        '#9400D3',
        '#4B0082',
        '#0000FF',
        '#00FF00',
        '#FFFF00',
        '#FF7F00',
        '#FF0000'
      ]
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  onImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  onImageError() {
    this.setState({ imageStatus: 'gif failed to load :(' });
  }

  getRandomColor(){
    const { placeHolderColors } = this.state;
    return placeHolderColors[Math.floor(Math.random() * placeHolderColors.length)];
  }

  render() {

    const { src, id, onGifClick, width } = this.props;
    let randomColor = this.getRandomColor();

    let gifStyle = {
      width: width + 'px',
      borderColor: randomColor
    }

    let loadingIconStyle = {
      color: randomColor
    }

    let gifClasses = classnames('Gif', {
      'fadeIn': this.state.imageStatus === "loaded",
      'hidden': this.state.imageStatus !== 'loaded'
    });

    return (
      <div className="GifWrapper">
        <img
          className={gifClasses}
          src={src}
          onLoad={this.onImageLoaded}
          onError={this.onImageError}
          onClick={() => onGifClick(id)}
          alt=""
        />
        {this.state.imageStatus === 'loading' &&
          <div className="GifPlaceholder" style={gifStyle}>
            <i className="fa fa-spinner spin loadingIcon" aria-hidden="true" style={loadingIconStyle}></i>
          </div>
        }
      </div>
    );
  }
}

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onGifClick: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

export default Gif;
