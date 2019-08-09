/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import fileToURL from '../tools/fileToURL';
import { updatePublications } from '../store/actions';
import FilePicker from '../atoms/FilePicker';
import Spinner from '../atoms/Spinner';

function FilesToUpload({ type, publications, dispatch }) {
  const { imagesVideos, files } = publications;
  const [state, setState] = useState({});

  const handleChange = (event) => {
    const { target: { name, files } } = event;
    dispatch(updatePublications({ [name]: [...publications[name], ...files] }));
  };

  return (
    <div className="files-to-upload">
      {
        type === 'imagesVideos' ? (
          imagesVideos.map((file, index) => {
            const typeFile = file.type.split('/')[0];

            if (!state[index]) fileToURL(file).then(url => setState({ ...state, [index]: url }));

            return (
              <div className="image-preview">
                { !state[index] && <Spinner /> }
                <div className="remove-file">✖</div>
                {
                  typeFile === 'video' ? (
                    <video height={100} src={state[index]} alt="Preview" autoPlay />
                  ) : (
                    <img height={100} src={state[index]} alt="Preview" />
                  )
                }
              </div>
            );
          })
        ) : (
          files.map((file, index) => {
            console.log(file);
            return (
              <div className="file-preview">
                <div className="remove-file">✖</div>
                <div className="file">
                  <FontAwesomeIcon icon={faPlusCircle} />
                  { file.name }
                </div>
              </div>
            );
          })
        )
      }
      {
        type === 'imagesVideos' ? (
          <FilePicker
            className="file-picker-like-item"
            multi
            name="imagesVideos"
            onChange={handleChange}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </FilePicker>
        ) : (
          <FilePicker className="file-picker-like-doc" multi name="files" onChange={handleChange}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </FilePicker>
        )
      }
    </div>
  );
}

function mapStateToProps(state) {
  return { publications: state.publications };
}

export default connect(mapStateToProps)(FilesToUpload);

FilesToUpload.propTypes = {
  type: PropTypes.string,
};

FilesToUpload.defaultProps = {
  type: 'imagesVideos',
};
