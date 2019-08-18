import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faPaperclip } from '@fortawesome/free-solid-svg-icons';

import { updatePublications } from '../store/actions';
import FilePicker from '../atoms/FilePicker';

function AttachedFiles({ publications, setPublications }) {

  const handleChange = (event) => {
    const { target: { name, files } } = event;
    setPublications({ ...publications, [name]: [...publications[name], ...files] });
  };

  return (
    <div className="attached-files">
      <FilePicker name="imagesVideos" onChange={handleChange}>
        <div>
          <FontAwesomeIcon icon={faImages} />
          <span>Foto/video</span>
        </div>
      </FilePicker>
      <FilePicker name="files" onChange={handleChange} type="forFiles">
        <div>
          <FontAwesomeIcon icon={faPaperclip} />
          <span>Archivos</span>
        </div>
      </FilePicker>
    </div>
  );
}

export default AttachedFiles;
