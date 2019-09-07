import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';

import fileToUrl from '../../tools/fileToURL';

function FilePicker({ children, multi, type, onChange, onBase64, name, className }) {
  const [state] = useState({
    inputFile: createRef(),
  });

  const ft = {
    text: '.pdf, .doc, .docx, .log, .odt, .tex, .txt, .wpd, .wps, ',
    data: '.csv, .dat, .key, .keychain, .pps, .ppt, .pptx, .sdf, .tar, .xml, ',
    spreadshhet: '.xlr, .xls, xlsx, ',
    compress: '.rar, .zip, .7z',
  };

  const fileTypes = {
    forImages: '.jpg, .jpeg, .gif, .png',
    forImagesAndVideos: '.jpg, .jpeg, .gif, .png, .mp4, .avi, .mov, .flv, .wmv, .mkv, .qt',
    forFiles: `${ft.text}${ft.data}${ft.spreadshhet}${ft.compress}`,
    forDocsAndImages: `${ft.text} .jpg, .jpeg, .gif, .png`,
  };

  const handleClick = () => {
    const { inputFile } = state;
    inputFile.current.click();
  };

  const handleChange = (event) => {
    const { target } = event
    if (onChange) onChange(event)
    if (onBase64) fileToUrl(target.files[0]).then(base64Url => onBase64(base64Url))
  }

  return (
    <div className={`reusables-file-picker ${className}`}>
      <input
        name={name}
        onChange={handleChange}
        ref={state.inputFile}
        type="file"
        multiple={multi}
        accept={fileTypes[type]} />
      <div
        className="reusables-file-picker-button-container"
        onClick={handleClick}>
        { children }
      </div>
    </div>
  );
}

export default FilePicker;

FilePicker.propTypes = {
  multi: PropTypes.bool,
  type: PropTypes.oneOf(['forImages', 'forImagesAndVideos', 'forFiles', 'forDocsAndImages']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FilePicker.defaultProps = {
  multi: false,
  type: 'forImagesAndVideos',
  className: '',
};
