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
import AttachFileItem from '../reusables/AttachFileItem';
import ImagesLightbox from '../reusables/ImagesLightbox';

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
      if (type === 'imagesVideos') {
        generateArray(target.files).then(result => {
          setPublication({ ...publication, [type]: [...publication[type], ...result] })
          setLoading(false);
        });
      } else if (type === 'files') {
        const filesArray = Object.keys(target.files).map(key => {
          return target.files[Number(key)]
        })
        setPublication({ ...publication, [type]: [...publication[type], ...filesArray] });
        setLoading(false);
      }
    }
  }

  /* ============================ */

  const handleClick = () => {
    const formData = new FormData();

    formData.append('text', publication.text);
    urls.map(url => formData.append('urls', url));
    imagesVideos.map(item => formData.append('images', item.file));
    files.map(item => formData.append('docs', item));

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
          <FilePicker
            name="imagesVideos"
            type="forFiles"
            onChange={(event) => handleAttachs(event, 'files')}
            multi >
            <button>
              Archivo
              <Icon type="paper-clip" />
            </button>
          </FilePicker>
        </div>
        <Button
          width="200px"
          marginTop="16px"
          marginBottom="16px"
          onClick={handleClick} >
            Publicar
        </Button>
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
                    videoStyle={{ filter: 'blur(4px)' }}
                    activeCenterText={`+ ${imagesVideos.length - 5}`}
                    isVideo={item.type === 'video'}
                  />
                </MediaGallery>
              )
            }
            return (
              <ImagesLightbox imagesArray={[item.base64]}>
                <ImagePreview
                  url={item.base64}
                  containerStyle={{ borderStyle: 'none', cursor: 'pointer' }}
                  isVideo={item.type === 'video'}
                />
              </ImagesLightbox>
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

      <div className="feed-publisher-files">
        {
          files.map(file => {
            return (
              <AttachFileItem name={file.name} />
            )
          })
        }
      </div>
      
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
