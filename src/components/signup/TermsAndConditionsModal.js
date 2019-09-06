import React, { useState } from 'react';

import { Modal, Typography, Input, Checkbox } from 'antd';
import terms from './terms.json';

function TermsAndConditions({ children, onAccept }) {
  const { Title } = Typography;
  const { TextArea } = Input;

  const [openModal, setOpenModal] = useState(false);
  const [acceptCheck, setAcceptCheck] = useState(false);

  const handleAccept = (from) => {
    if (from === 'cancel') {
      setAcceptCheck(false);
      if (onAccept) onAccept(false);
    } else {
      if (onAccept) onAccept(acceptCheck);
    }

    setOpenModal(false);
  }

  return (
    <div className="terms-and-conditions">
      <div style={{ display: 'inline-block' }} onClick={() => setOpenModal(true)}>
        {children}
      </div>
      <Modal
        className="terms-and-conditions-modal"
        onOk={() => handleAccept('ok')}
        okButtonProps={{ className: 'amg-button amg-button-secondary', disabled: !acceptCheck, }}
        cancelButtonProps={{ className: 'amg-button amg-button-outline-secondary' }}
        onCancel={() => handleAccept('cancel')}
        cancelText="Cancelar"
        okText="Aceptar"
        visible={openModal}
      >
        <Title level={4}>Términos y condiciones</Title>
        <TextArea rows={9} value={terms.terms} />
        <div className="terms-and-conditions-check">
          <Checkbox onChange={({ target }) => setAcceptCheck(target.checked)} checked={acceptCheck}>
            <div className="terms-and-conditions-check-text">
              He leído los términos y condiciones de la Solicitud de Ingreso a la Asociación Mexicana de Gastroenterología.
            </div>
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
}

export default TermsAndConditions;
