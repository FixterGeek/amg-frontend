import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import getURL from 'get-urls';
import uniqid from 'uniqid';

import { Icon } from 'antd';

import { createPublicationAction } from '../../store/ducks/publicationsDuck';
import fileToUrl from '../../tools/fileToURL';
import useSweet from '../../hooks/useSweetAlert';
import PublicationBox from './reusables/PublicationBox';
import Button from '../reusables/Button';
import Spinner from '../reusables/Spinner';
import ContainerItem from '../reusables/ContainerItem';
import FilePicker from '../reusables/FilePicker';
import ImagePreview from '../reusables/ImagePreview';
import MediaGallery from './reusables/MediaGallery';
import FullMediaModal from '../reusables/FullMediaModal';
// import AttachedFiles from './AttachedFiles';
// import FilesToUpload from './FilesToUpload';

function Publisher({
  createPublicationAction, fetching, status, added, user
}) {
  const { errorAlert } = useSweet();

  const initialPublications = {
    publications: [],
    imagesVideos: [],
    files: [],
    urls: [],
    text: '',
  };

  const [publication, setPublication] = useState(initialPublications);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const { imagesVideos, files } = publication;
  const { basicData } = user;

  useEffect(() => {
    if (status === 'error') errorAlert({ text: 'Error al publicar' })
  }, [status]);

  useEffect(() => {
    let tempUrls = [];
    const finded = getURL(publication.text);
    finded.forEach((value) => {
      tempUrls = [...tempUrls, value];
    });

    setUrls([tempUrls]);
  }, [publication.text]);


  const handleText = (value) => {
    setPublication({ ...publication, text: value })
  }

  /* ==== Preoccess files block ==== */
  const getBase64 = async (fl) => {
    const url = await fileToUrl(fl).then(url => url);
    return { file: fl, base64: url, type: fl.type.split('/')[0] }
  }

  const generateArray = async(fls) => {
    return await Promise.all(
      Object.keys(fls).map(key => {
        return getBase64(fls[key])
      })
    )
  }

  const handleAttachs = async ({ target }, type) => {
    if (target.files.length > 0) {
      setLoading(true)
      generateArray(target.files).then(result => {
        setPublication({ ...publication, [type]: [...publication[type], ...result] })
        setLoading(false);
      });
    }
  }

  /* ============================ */

  console.log(publication);

  const handleClick = () => {
    const formData = new FormData();

    formData.append('text', publication.text);
    urls.map(url => formData.append('urls', url));
    imagesVideos.map(item => formData.append('images', item.file));
    files.map(item => formData.append('docs', item.file));

    createPublicationAction(formData).then(() => setPublication(initialPublications));
  };

  return (
    <ContainerItem className="feed-publisher" style={{ position: 'relative' }}>
      { fetching || loading ? <Spinner /> : null }
      <PublicationBox
        onChange={handleText}
        value={publication.text}
        photoUrl={basicData.photoURL}
      />

      <div className="feed-publisher-controls">
        <div className="feed-publisher-controls-attachs">
          <FilePicker
            name="imagesVideos"
            onChange={(event) => handleAttachs(event, 'imagesVideos')}
            multi >
            <button>
              Imagen/Video
              <Icon type="picture" />
            </button>
          </FilePicker>
        </div>
        <Button width="200px" onClick={handleClick}>Publicar</Button>
      </div>
      <div className="feed-publisher-previews">
        { 
          imagesVideos.slice(0, 5).map((item, index) => {
            if (imagesVideos.length > 5 && index === 4) {
              return (
                <MediaGallery
                  key={index}
                  text={`+ ${imagesVideos.length}`}
                  modalTitle="Archivos a subir:"
                  dataSource={imagesVideos}
                  sourceKey="base64"
                  typeKey="type" >

                  <ImagePreview
                    url={item.base64}
                    containerStyle={{ borderStyle: 'none', cursor: 'pointer' }}
                    imageStyle={{ filter: 'blur(4px)' }}
                    activeCenterText={`+ ${imagesVideos.length - 5}`}
                  />
                </MediaGallery>
              )
            }
            return (
              <FullMediaModal type={item.type} url={item.base64}                   key={index}>
                <ImagePreview
                  url={item.base64}
                  containerStyle={{ borderStyle: 'none', cursor: 'pointer' }}
                />
              </FullMediaModal>
            )
          })
        }
        {
          imagesVideos.length > 0 ? (
            <FilePicker
              name="morepics"
              onChange={(event) => handleAttachs(event, 'imagesVideos')}
              multi >
              <ImagePreview />
            </FilePicker>
          ): null
        }
      </div>
      { imagesVideos.length > 0 &&
        // <FilesToUpload
        // dispatch={setPublications}
        // publications={publications}
        // type="imagesVideos" />
        null
      }
    </ContainerItem>
  );
}

function mapStateToProps({ publications, user }) {
  return {
    fetching: publications.adding,
    status: publications.status,
    user,
  };
}

export default connect(mapStateToProps, { createPublicationAction })(Publisher);
