import React, { useState, useEffect } from 'react';

import { Skeleton } from 'antd';

import { getFromUrls } from '../../../tools/fileToURL';

import ImagePreview from '../../reusables/ImagePreview';
import FullMediaModal from '../../reusables/FullMediaModal';
import MediaGallery from './MediaGallery';

function PublicationGallery({ urlArray }) {
  const [loading, setLoading] = useState(true);
  const [medias, setMedia] = useState([])

  useEffect(() => {
    getFromUrls(urlArray).then(array => {
      setMedia(array);
      setLoading(false);
    });
  }, []);

  

  return (
    <div className="feed-reusables-publication-gallery">
      { loading && <Skeleton active /> }
      {
        medias.length > 1 ? (
          <div className="feed-reusables-publication-gallery-medias">
            {
              medias.slice(0, 4).map((media, index) => {
                if (medias.length > 4 && index === 3) {
                  return (
                    <MediaGallery dataSource={medias} sourceKey="base64" typeKey="type">
                      <ImagePreview
                        url={media.base64}
                        imageStyle={{ filter: 'blur(4px)' }}
                        videoStyle={{ filter: 'blur(4px)' }}
                        activeCenterText={`+ ${medias.length - 4}`}
                        isVideo={media.type === 'video'}
                      />
                    </MediaGallery>
                  )
                }

                return (
                  <FullMediaModal url={media.base64} type={media.type} >
                    <ImagePreview
                        url={media.base64}
                        isVideo={media.type === 'video'}
                    / >
                  </FullMediaModal>
                )
              })
            }
          </div>
        ) : (
          <div className="feed-reusables-publication-gallery-medias-one">
            {
              medias.map(media => (
                <FullMediaModal url={media.base64} type={media.type} >
                  <ImagePreview
                      url={media.base64}
                  / >
                </FullMediaModal>
              ))
              }
          </div>
        )
      }
    </div>
  );
}

export default PublicationGallery;
