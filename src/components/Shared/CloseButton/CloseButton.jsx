import PropTypes from 'prop-types';
import React from 'react';

import './CloseButton.css';


const CloseButton = ({onClose}) => {
  return (
    <button
      className="close-button"
      type="button"
      aria-label="Закрыть."
      onClick={onClose}
    />
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func
}

export default CloseButton;