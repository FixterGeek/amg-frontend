import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

import Button from '../../reusables/Button';

function JustModal({ buttonText, childElement, openComponent }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      {
        openComponent ? (
          <button onClick={() => setOpenModal(true)}>
            { openComponent }
          </button>
        ) : (
          <Button marginTop="0px" width="200px" onClick={() => setOpenModal(true)}>
            { buttonText }
          </Button>
        )
      }
      <Modal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        { childElement }
      </Modal>
    </div>
  );
}

export default JustModal;

JustModal.propTypes = {
  buttonText: PropTypes.string,
};

JustModal.defaultProps = {
  buttonText: 'Abrir',
};
