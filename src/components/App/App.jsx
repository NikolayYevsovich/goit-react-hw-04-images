import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

export default class App extends Component {
  state = { searchQuery: '' };

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { handleSearchSubmit } = this;
    const { searchQuery } = this.state;

    return (
      <div>
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
