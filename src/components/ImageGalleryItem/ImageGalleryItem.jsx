import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  togleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={this.props.webformatURL}
          alt={this.props.alt}
          onClick={this.togleModal}
        />
        {this.state.showModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            alt={this.props.largeImageURL}
            closeModal={this.togleModal}
          />
        )}
      </li>
    );
  }
}
