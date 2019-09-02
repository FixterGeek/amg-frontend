import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd'

import ImagePreview from '../../reusables/ImagePreview';
import FullMediaModal from '../../reusables/FullMediaModal';

function MediaGallery({ children, text, modalTitle, dataSource, sourceKey, typeKey }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="feed-reusables-media-gallery">
      <div onClick={() => setOpenModal(true)}>
        { children }
      </div>
      <Modal
        onCancel={() => setOpenModal(false)}
        title={modalTitle}
        footer={null}
        width="80vw"
        visible={openModal} >

          <div className="feed-reusables-media-gallery-medias">
            {
              dataSource.map(media => {
                return (
                  <FullMediaModal type={media[typeKey]} url={media[sourceKey]}>
                    <ImagePreview
                      containerStyle={{
                        maxWidth: '150px', maxHeight: '150px', borderStyle: 'none',
                        margin: '8px', cursor: 'pointer',
                      }}
                      imageStyle={{ maxWidth: '310px', maxHeight: '210px' }}
                      url={media[sourceKey] || media}
                      isVideo={media[typeKey] === 'video'}
                    />
                  </FullMediaModal>
                )
              })
            }
          </div>
      </Modal>
    </div>
  )
}

export default MediaGallery;

MediaGallery.propTypes = {
  text: PropTypes.string,
  modalTitle: PropTypes.string,
  dataSource: PropTypes.array,
  sourceKey: PropTypes.string,
};

MediaGallery.defaultProps = {
  text: null,
  modalTitle: null,
  dataSource: [],
  sourceKey: 'name',
}
