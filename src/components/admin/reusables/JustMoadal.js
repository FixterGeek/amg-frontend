import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

import Button from '../../reusables/Button';

function JustModal({
  buttonText, childElement, openComponent, close,
  modalTitle, onClose, lineButton = false,
}) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (close) setOpenModal(false);
  }, [close]);

  useEffect(() => {
    if (onClose) onClose(openModal, openModal ? 'open' : 'close');
  }, [openModal]);

  const handleCancel = () => {
    setOpenModal(opened => !opened);
  }

  return (
    <div className="admin-reusables-just-modal">
      {
        openComponent ? (
          <button onClick={() => setOpenModal(true)} className="admin-reusables-just-modal-open-component">
            { openComponent }
          </button>
        ) : (
          <Button
            line={lineButton}
            marginTop="0px"
            bgColor={buttonText === 'Editar módulo' ? 'yellow' : 'secondary'}
            width="200px" onClick={() => setOpenModal(true)}>
            { buttonText }
          </Button>
        )
      }
      <Modal
        visible={openModal}
        onCancel={handleCancel}
        footer={null}
        title={modalTitle || null}
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
