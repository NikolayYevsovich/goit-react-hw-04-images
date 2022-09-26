import React, { Component } from 'react';
import { Dna } from 'react-loader-spinner';
import imagesApi from '../../services/images-api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from '../Button/Button';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      imagesApi
        .fetchImages(nextQuery, this.state.page)
        .then(response => {
          this.setState({
            images: response.hits,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  componentDidMount(prevProps, prevState) {}

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, showModal } = this.state;

    if (status === 'idle') {
      return <h1 className={css.CleanPage}>Please enter search request </h1>;
    }
    if (status === 'pending') {
      return (
        <div className={css.loader}>
          <Dna
            visible={true}
            height="500"
            width="500"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      );
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <div className={css.GalleryWrapper}>
          <ul className={css.Gallery}>
            {images &&
              images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  webformatURL={image.webformatURL}
                  largeImageURL={image.largeImageURL}
                  alt={image.tags}
                />
              ))}
          </ul>
          <LoadMoreButton loadMore={this.loadMore} />
        </div>
      );
    }
  }
}
