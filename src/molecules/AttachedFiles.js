import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faPaperclip } from '@fortawesome/free-solid-svg-icons';

import { updatePublications } from '../redux/actions';
import FilePicker from '../atoms/FilePicker';

function AttachedFiles({ images, publications, dispatch }) {

  const handleChange = (event) => {
    const { target: { name, files } } = event;
    dispatch(updatePublications({ [name]: [...publications[name], ...files] }));
  };

  return (
    <div className="attached-files">
      <FilePicker multi name="imagesVideos" onChange={handleChange}>
        <div>
          <FontAwesomeIcon icon={faImages} />
          <span>Foto/video</span>
        </div>
      </FilePicker>
      <FilePicker multi name="files" onChange={handleChange} type="forFiles">
        <div>
          <FontAwesomeIcon icon={faPaperclip} />
          <span>Archivos</span>
        </div>
      </FilePicker>
    </div>
  );
}

function mapStateToProps(state) {
  return { publications: state.publications };
}

export default connect(mapStateToProps)(AttachedFiles);

AttachedFiles.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

AttachedFiles.defaultProps = {
  images: [],
};
