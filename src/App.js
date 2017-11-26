import React, { Component } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import Gif from './Gif';
import GifDetail from './GifDetail';
import Pagination from './Pagination';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import keys from './keys.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
      apiUrl: "http://api.giphy.com/v1/",
      apiKey: `${keys.giphy}`,
      searchType: "gifs",
      endpointType: "search",
      query: "",
      queryLimit: 10,
      paginationToggle: false,
      count: 0,
      totalGifs: null,
      offset: 0,
      gifs: [],
      selectedGif: null
    };
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
    // Destructure out what we need from state.
    const { offset, queryLimit, query, searchType, endpointType, apiUrl, apiKey } = this.state;
    // Define the search query template literal.
    let searchQuery = `${apiUrl}${searchType}/${endpointType}?q=${query}&api_key=${apiKey}&limit=${queryLimit}&offset=${offset}`;

    // Query the Endpoint with our search query.
    fetch(searchQuery)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        // Set state with the response.
        count: data.pagination.count,
        offset: data.pagination.offset,
        totalGifs: data.pagination.total_count,
        gifs: data.data
      });
    })
    .catch((err) => {
      console.error('whoooops GiphyApiClient error!', err);
    })
  }

  onGifClick(id) {
    // Find the clicked/selected gif by its id and add it to state. We'll use this to data to render our GifDetail component.
    this.setState({
      selectedGif: _.find(this.state.gifs, { id })
    });
  }

  onPageClick(next) {
    const { offset, queryLimit, totalGifs } = this.state;
    const navigatingBack = next === undefined;
    let count = queryLimit;
    let updateOffset;

    // If next is undefined (we're navigating back), make count a negative value.
    if (navigatingBack) {
      count = count * -1;
    }

    // Update our offset value.
    updateOffset = ( 
      offset <= 0 && navigatingBack
      || offset / queryLimit + 1 === Math.round(totalGifs / queryLimit) && !navigatingBack
    )  
      ? offset : offset + count;

    // Update our offset value in state and call search on callback.
    this.setState({
      offset: updateOffset
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
            title={selectedGif.title ? selectedGif.title : null}
            originalSrc={selectedGif.images.original.url}
            userName={selectedGif.username !== "" ? selectedGif.username : undefined}
            uploadTime={Moment(selectedGif.import_datetime).format("Do of MMMM, YYYY")}
            onClose={this.onGifDetailClose}
          />
        }
        <ul className="App__list">
          {gifs.map(gif =>
            <li className="App__list-item" key={gif.id}>
              <Gif
                src={gif.images.fixed_height.url}
                id={gif.id}
                onGifClick={this.onGifClick}
              />
            </li>
          )}
        </ul>
        {paginationToggle &&
          <Pagination
            currentPage={offset / queryLimit + 1}
            totalPages={Math.round(totalGifs / queryLimit)}
            onPageClick={this.onPageClick}
          />
        }
      </div>
    );
  }
}

export default App;
