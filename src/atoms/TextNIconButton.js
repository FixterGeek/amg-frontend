/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function TextNIconButton({ text, icon, to, downloadable, iconStyle }) {
  // eslint-disable-next-line curly
  if (downloadable) return (
    <div className="text-n-icon-button">
      <a href={to} download target="_blank">
        <div>{ text }</div>
        <div className="text-n-icon-icon" style={{ ...iconStyle }}>
          <FontAwesomeIcon icon={faDownload} />
        </div>
      </a>
    </div>
  );

  return (
    <div className="text-n-icon-button">
      <Link to={to}>
        <div>{ text }</div>
        <div className={`text-n-icon-icon ${icon}`} style={{ ...iconStyle }} />
      </Link>
    </div>
  );
}

export default TextNIconButton;
