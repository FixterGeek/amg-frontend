import React, { useState } from 'react';

import { Modal } from 'antd';

function ImagePreview({ url, className }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className={className}
        style={{ backgroundImage: `url(${url})` }} />
      <Modal
        footer={null}
        width="100vh"
        bodyStyle={{ width: '80vw' }}
        visible={open}
        onCancel={() => setOpen(false)}
      >
        <img style={{ maxWidth: '88%', marginTop: '16px' }} src={url} />
      </Modal>
    </div>
  );
}

export default ImagePreview;
