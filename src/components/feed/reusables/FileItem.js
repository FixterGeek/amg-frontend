import React from 'react';

function FileItem({ url }) {
  console.log(url);
  const urlSections = url.split('/');
  return (
      <a href={url} target="_blank" className="reusable-file-item">
        { urlSections[urlSections.length - 1] }
      </a>
  );
}

export default FileItem;
