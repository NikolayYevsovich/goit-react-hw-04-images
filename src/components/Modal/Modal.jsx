import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeImageURL, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  });

  const onClose = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img className={css.modalImage} src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
