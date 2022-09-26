import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  onClose = event => {
    if (event.code === 'Escape') {
      this.props.togleModal();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
