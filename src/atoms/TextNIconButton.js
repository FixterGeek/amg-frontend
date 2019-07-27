/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function TextNIconButton({ text, icon, to, downloadable, event }) {
  // eslint-disable-next-line curly
  if (downloadable) return (
    <div className="text-n-icon-button">
      <a href={to} download target="_blank">
        <div>{ text }</div>
        <div className="text-n-icon-icon">
          <FontAwesomeIcon icon={faDownload} />
        </div>
      </a>
    </div>
  );

  return (
    <div className="text-n-icon-button">
      <Link to={to}>
        <div>{ text }</div>
        <div className={`text-n-icon-icon ${icon}`} />
      </Link>
    </div>
  );
}

export default TextNIconButton;
