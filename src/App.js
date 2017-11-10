import React, { Component } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import GphApiClient from 'giphy-js-sdk-core';
import Gif from './Gif';
import GifDetail from './GifDetail';
import Pagination from './Pagination';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

  constructor() {
    super();
    // Initial state.
    this.state = {
      apiKey: "SZzPRVnL4SBoNisS0aTGfgCGyRiTCIk5",
      queryLimit: 10,
      query: "",
      paginationToggle: false,
      totalGifs: null,
      offset: 0,
      gifs: [],
      selectedGif: null
    };
    // Initialise Giphy SDK with APIKey.
    this.apiClient = GphApiClient(this.state.apiKey);
    // Make updateSearch a debounced function so we aren't hammering the query endpoint.
    this.updateSearch = _.debounce(this.updateSearch, 350);

    // Context binding.
    this.onGifClick = this.onGifClick.bind(this);
    this.onGifDetailClose = this.onGifDetailClose.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }

  updateSearch() {
    // Add the query from input value to state, toggle pagination if we have a value in input search.
    this.setState({
      query: this.refs.query.value,
      paginationToggle: this.refs.query.value !== '' ? true : false
    }, () => {
      // Search on setState callback
      this.search();
    });
  }

  search() {
    // Query the Giphy Search Endpoint with our search query, limit and our offset for pagination.
    this.apiClient.search('gifs', { "q": this.state.query, "limit": this.state.queryLimit, "offset": this.state.offset })
      .then((response) => {
        // Set state with the response.
        this.setState({
          count: response.pagination.count,
          offset: response.pagination.offset,
          totalGifs: response.pagination.total_count,
          gifs: response.data
        });
      })
      .catch((err) => {
        console.error('whoooops GiphyApiClient error!');
      })
  }

  onGifClick(id) {
    // Find the clicked/selected gif by its id and add it to state. We'll use this to data to render our GifDetail component.
    this.setState({
      selectedGif: _.find(this.state.gifs, { id })
    });
  }

  onPageClick(next) {
    // Define count equal to our query limit.
    let count = this.state.queryLimit;

    // If next is undefined (we're going back), make count a negative value.
    if (next === undefined) {
      count = count * -1;
    }

    // Update our offset value in state and call search on callback.
    this.setState({
      offset: this.state.offset + count
    }, () => this.search());
  }

  onGifDetailClose() {
    // Set selectedGif back to its initial state (null), removing it from next render.
    this.setState({
      selectedGif: null
    });
  }

  render() {
    const { paginationToggle, selectedGif, gifs, totalGifs, offset, queryLimit } = this.state;

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Giphy Search</h1>
          <input className="App__input" ref="query" onChange={(e) => this.updateSearch()} type="text" placeholder="Search... ALL THE GIFS!" />
        </header>
        {selectedGif &&
          <GifDetail
            title={selectedGif.title ? selectedGif.title : undefined}
            originalSrc={selectedGif.images.original.gif_url}
            userName={selectedGif.user !== null ? selectedGif.user.username : undefined}
            uploadTime={Moment(selectedGif.import_datetime).format("Do of MMMM, YYYY")}
            onClose={this.onGifDetailClose}
          />
        }
        <ul className="App__list">
          {gifs.map(gif =>
            <li className="App__list-item" key={gif.id}>
              <Gif
                src={gif.images.fixed_height.gif_url}
                id={gif.id}
                onGifClick={this.onGifClick}
              />
            </li>
          )}
        </ul>
        {paginationToggle &&
          <Pagination
            page={offset / queryLimit + 1}
            pageCount={Math.round(totalGifs / queryLimit)}
            onPageClick={this.onPageClick}
          />
        }
      </div>
    );
  }
}

export default App;
