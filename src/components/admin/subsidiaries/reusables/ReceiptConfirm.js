import React from 'react';

import { Modal, List, Avatar, Typography } from 'antd';

function ReceiptConfirm({ users, onConfirm, onCancel , visible = false }) {
  const { Item } = List;
  const { Text } = Typography;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel(false)}
      onOk={handleConfirm}
      okText="Enviar"
      cancelText="Cancelar"
    >
      <Text strong>
        Estas a punto de enviar un comprobante con los siguientes usuarios:
      </Text>
      <List>
        {
          users.map(u => (
            <Item key={u._id}>
              <Item.Meta
                avatar={<Avatar src={u.basicData.photoURL} shape="square" />}
                title={`${u.basicData.name} ${u.basicData.dadSurname}`}
                description={u.email}
              />
            </Item>
          ))
        }
      </List>
    </Modal>
  );
}

export default ReceiptConfirm;
