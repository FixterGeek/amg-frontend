import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faFileCsv } from '@fortawesome/free-solid-svg-icons';

import { Input } from 'antd';

import Attach from '../atoms/AttachButtons';
import Spinner from '../atoms/Spinner';
import useAmgService from '../hooks/services/useAmgService';
import { updatePublications } from '../store/actions';

function Publisher({ publications, dispatch }) {
  const [loading, setLoading] = useState(false);
  const { toPublish } = useAmgService();
  const {
    image, image64, file, fileType,
  } = publications;
  const icon = [faFilePdf, faFileWord, faFileCsv];
  const { Search } = Input;

  const resetFields = () => {
    dispatch(updatePublications({
      image: null,
      image64: null,
      file: null,
      fileType: null,
    }));
  };

  const handleClick = (value) => {
    setLoading(true);

    if (!image && !file) {
      toPublish({
        text: value,
      }).then(({ data }) => {
        console.log(data);
        setLoading(false);
        resetFields();
      }).catch(({ response }) => {
        setLoading(false);
        console.log(response);
      });
    } else if (image && !file) {
      const formData = new FormData();

      formData.append('images', image);
      formData.append('text', value);
      toPublish(formData, { 'X-Requested-With': 'XMLHttpRequest' })
        .then(({ data }) => {
          setLoading(false);
          resetFields();
          console.log(data);
        }).catch(({ response }) => {
          setLoading(false);
          console.log(response);
        });
    } else if (file && !image) {
      const formData = new FormData();

      formData.append('docs', file);
      formData.append('text', value);
      toPublish(formData, { 'X-Requested-With': 'XMLHttpRequest' })
        .then(({ data }) => {
          setLoading(false);
          resetFields();
          console.log(data);
        }).catch(({ response }) => {
          setLoading(false);
          console.log(response);
        });
    } else if (file && image) {
      const formData = new FormData();

      formData.append('images', image);
      formData.append('docs', file);
      formData.append('text', value);
      toPublish(formData, { 'X-Requested-With': 'XMLHttpRequest' })
        .then(({ data }) => {
          setLoading(false);
          resetFields();
          console.log(data);
        }).catch(({ response }) => {
          setLoading(false);
          console.log(response);
        });
    }
  };

  return (
    <div className="publisher">
      { loading && <Spinner tip="Publicando..." /> }
      <Search enterButton="Publicar" placeholder="Cuéntanos algo" onSearch={handleClick} />
      <div className="publisher-attaches">
        {
          image64 && (
            <div
              className="publisher-image-preview"
              style={{ backgroundImage: `url(${image64})` }}>
              {/* <img src={image64} width="120" alt="Preview" /> */}
            </div>
          )
        }
        {
          fileType && (
            <div className="publisher-file">
              { fileType === 'pdf' && (<FontAwesomeIcon icon={icon[0]} />) }
            </div>
          )
        }
      </div>
      <Attach />
    </div>
  );
}

function mapStateToProps(state) {
  return { publications: state.publications };
}

export default connect(mapStateToProps)(Publisher);
