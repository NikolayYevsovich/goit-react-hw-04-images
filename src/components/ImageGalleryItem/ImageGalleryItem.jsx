import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, alt, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const togleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={alt}
        onClick={togleModal}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          alt={largeImageURL}
          closeModal={togleModal}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
