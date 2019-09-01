import React from 'react';
import { Icon } from 'antd';

function AttachFileItem({ name, link, url }) {
  if (link) return (
    <a className="reusables-attach-file-item" href={url} target="_blank">
      <div>{ url.split('/').pop() }</div>
      <Icon type="file" />
    </a>
  )

  return (
    <div className="reusables-attach-file-item">
      <div>{ name }</div>
      <Icon type="file-done" />
    </div>
  );
}

export default AttachFileItem;
