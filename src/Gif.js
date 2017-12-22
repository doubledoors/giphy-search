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

    let gifStyle = {
      width: this.props.width + 'px'
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
