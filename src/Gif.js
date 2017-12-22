import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Gif extends Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }

  onImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  onImageError() {
    this.setState({ imageStatus: 'failed to load' });
  }

  render() {

    let classes = classnames('Gif', {
      'fadeIn': this.state.imageStatus === "loaded"
    });

    return (
      <div>
        <img
          className={classes}
          src={this.props.src}
          onLoad={this.onImageLoaded.bind(this)}
          onError={this.onImageError.bind(this)}
          onClick={() => this.props.onGifClick(this.props.id)}
          alt=""
        />
        {this.state.imageStatus === 'loading' &&
          <i class="fa fa-spinner spin" aria-hidden="true"></i>
        }
      </div>
    );
  }
}

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onGifClick: PropTypes.func.isRequired
};

export default Gif;
