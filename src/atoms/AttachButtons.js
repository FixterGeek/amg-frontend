import React from 'react';
import { FilePicker } from 'react-file-picker';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';

import toBase64 from '../tools/toBase64';
import { updatePublications } from '../store/actions';

function AttachButtons(props) {
  const { publications, dispatch } = props;
  const { image, file, fileType } = publications;

  const handleImage = (imageFile) => {
    dispatch(updatePublications({ image: imageFile }));
    toBase64(imageFile).then((base64) => {
      dispatch(updatePublications({ image64: base64 }));
    }).catch(error => error);
  };

  const handleFile = (file) => {
    dispatch(updatePublications({ file, fileType: file.type.split('/')[1] }));
  };

  return (
    <div className="attach-buttons">
      <div>
        <FilePicker
          extensions={['jpg', 'jpeg', 'png']}
          dims={{
            minWidth: 300, maxWidth: 1400, minHeight: 300, maxHeight: 1400,
          }}
          onChange={image => handleImage(image)}
          onError={error => error}
        >
          <FontAwesomeIcon icon={faImage} />
        </FilePicker>
      </div>
      <div>
        <FilePicker
          extensions={['pdf', 'doc', 'docx', 'odt', 'csv', 'ppt']}
          dims={{
            minWidth: 300, maxWidth: 1400, minHeight: 300, maxHeight: 1400,
          }}
          onChange={file => handleFile(file)}
          onError={error => error}
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </FilePicker>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { publications: state.publications };
}

export default connect(mapStateToProps)(AttachButtons);
