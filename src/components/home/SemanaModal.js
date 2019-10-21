import React, { useState, useRef } from 'react';

import { Modal, Typography } from 'antd';
import Button from '../reusables/Button';

function SemanaModal() {
  const { Title, Text } = Typography;

  const [openModal, setOpenModal] = useState(true);
  const anchor = useRef(null);

  const handleClick = () => {
    setOpenModal(false);
    anchor.current.click();
  }

  return (
    <Modal
      onCancel={() => setOpenModal(false)}
      footer={null}
      visible={openModal}
      bodyStyle={{ textAlign: 'center', paddingLeft: '40px', paddingRight: '40px' }}
    >
      <Title>Semana Nacional de Gastroenterología</Title>
      <Text>Entra al nuevo micrositio creado exclusivamente para Semana Nacional</Text>
      <Button htmlType="button" width="100%" onClick={handleClick}>
        Acceder al micrositio
      </Button>
      <a href="https://www.senaga.mx" target="_blank" ref={anchor} style={{ display: 'none' }} />
    </Modal>
  );
}

export default SemanaModal;
