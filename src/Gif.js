import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Gif extends Component {
  constructor() {
    super();
    this.state = { imageStatus: 'loading' };
  }

  onImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  onImageError() {
    this.setState({ imageStatus: 'failed to load' });
  }

  render() {

    const borderColors = [
      '#9400D3',
      '#4B0082',
      '#0000FF',
      '#00FF00',
      '#FFFF00',
      '#FF7F00',
      '#FF0000'
    ]

    let gifStyle = {
      width: this.props.width + 'px',
      borderColor: borderColors[Math.floor(Math.random() * borderColors.length)]
    }

    let imgClasses = classnames('Gif', {
      'fadeIn': this.state.imageStatus === "loaded",
      'hidden': this.state.imageStatus !== 'loaded'
    });

    return (
      <div className="GifWrapper">
        <img
          className={imgClasses}
          src={this.props.src}
          onLoad={this.onImageLoaded.bind(this)}
          onError={this.onImageError.bind(this)}
          onClick={() => this.props.onGifClick(this.props.id)}
          alt=""
        />
        {this.state.imageStatus === 'loading' &&
          <div className="GifPlaceholder" style={gifStyle}>
            <i className="fa fa-spinner spin loadingIcon" aria-hidden="true"></i>
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
