import PropTypes from 'prop-types';

import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  handleKeydownEsc = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownEsc);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div>
          <img
            className={css.modal}
            src={this.props.modalData.largeImageURL}
            alt={this.props.modalData.tags}
          />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalData: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}
