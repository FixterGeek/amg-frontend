import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import getURL from 'get-urls';

import { createPublicationAction } from '../store/ducks/publicationsDuck';
import useSweet from '../hooks/useSweetAlert';
import PublicationBox from '../atoms/PublicationBox';
import AttachedFiles from './AttachedFiles';
import FilesToUpload from './FilesToUpload';
import Spinner from '../atoms/Spinner';
import AmgButton from '../atoms/Button';
import useAmgService from '../hooks/services/useAmgService';

function Publisher({ createPublicationAction, fetching, status, added }) {
  const { errorAlert } = useSweet();

  const initialPublications = {
    publications: [],
    imagesVideos: [],
    files: [],
    urls: [],
  };
  const [publications, setPublications] = useState(initialPublications);

  console.log(publications);
  const [postText, setPostText] = useState('');
  const [urls, setUrls] = useState([]);
  const { toPublish } = useAmgService();
  const { imagesVideos, files } = publications;

  useEffect(() => {
    if (status === 'error') errorAlert({ text: 'Error al publicar' })
  }, [status]);

  useEffect(() => {
    let tempUrls = [];
    const finded = getURL(postText);
    finded.forEach((value) => {
      tempUrls = [...tempUrls, value];
    });

    setUrls([tempUrls]);
  }, [postText]);


  const handleClick = () => {
    const formData = new FormData();

    formData.append('text', postText);
    urls.map(url => formData.append('urls', url));
    imagesVideos.map(file => formData.append('images', file));
    files.map(file => formData.append('docs', file));

    createPublicationAction(formData).then(() => setPublications(initialPublications));
  };

  return (
    <div className="publisher">
      { fetching && <Spinner tip="Publicando..." /> }
      <PublicationBox postText={postText} setText={setPostText} />
      <AttachedFiles publications={publications} setPublications={setPublications} />
      <div className="files-preview-container">
        { files.length > 0 &&
          <FilesToUpload
            dispatch={setPublications}
            publications={publications}
            type="files" />
        }
      </div>
      { imagesVideos.length > 0 &&
        <FilesToUpload
        dispatch={setPublications}
        publications={publications}
        type="imagesVideos" />
      }
      <AmgButton width="200px" onClick={handleClick}>Publicar</AmgButton>
    </div>
  );
}

function mapStateToProps({ publications }) {
  return {
    fetching: publications.adding,
    status: publications.status,
  };
}

export default connect(mapStateToProps, { createPublicationAction })(Publisher);
