import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import getURL from 'get-urls';

import PublicationBox from '../atoms/PublicationBox';
import AttachedFiles from './AttachedFiles';
import FilesToUpload from './FilesToUpload';
import Spinner from '../atoms/Spinner';
import AmgButton from '../atoms/Button';
import useAmgService from '../hooks/services/useAmgService';

function Publisher({ publications, dispatch }) {
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState('');
  const [urls, setUrls] = useState([]);
  const { toPublish } = useAmgService();
  const { imagesVideos, files } = publications;

  useEffect(() => {
    let tempUrls = [];
    const finded = getURL(postText);
    finded.forEach((value) => {
      tempUrls = [...tempUrls, value];
    });

    setUrls([tempUrls]);
  }, [postText]);


  const handleClick = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append('text', postText);
    urls.map(url => formData.append('urls', url));
    imagesVideos.map(file => formData.append('images', file));
    files.map(file => formData.append('docs', file));

    toPublish(formData, { 'X-Requested-With': 'XMLHttpRequest' })
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
      });
  };

  return (
    <div className="publisher">
      { loading && <Spinner tip="Publicando..." /> }
      <PublicationBox postText={postText} setText={setPostText} />
      <AttachedFiles />
      <div className="files-preview-container">
        { files.length > 0 && <FilesToUpload type="files" /> }
      </div>
      { imagesVideos.length > 0 && <FilesToUpload type="imagesVideos" /> }
      <AmgButton width="200px" onClick={handleClick}>Publicar</AmgButton>
    </div>
  );
}

function mapStateToProps(state) {
  return { publications: state.publications };
}

export default connect(mapStateToProps)(Publisher);