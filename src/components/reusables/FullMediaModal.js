import React, { useState } from 'react';

import { Modal } from 'antd';

function FullMediaModal({ children, url, type }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="reusables-full-media-modal">
      <div onClick={() => setOpenModal(true)}>
        { children }
      </div>
      <Modal
        onCancel={() => setOpenModal(false)}
        bodyStyle={{ textAlign: 'center', padding: '36px' }}
        footer={null}
        width="90vw"
        visible={openModal}>
          {
            type === 'image' && (
              <img src={url} style={{ maxWidth: '100%' }} />
            )
          }
      </Modal>
    </div>
  )
}

export default FullMediaModal;
