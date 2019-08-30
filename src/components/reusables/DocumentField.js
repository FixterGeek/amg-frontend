import React, { useState, useEffect } from 'react';

import { Form, Input, Button as AntButton } from 'antd';

import Button from './Button';
import FilePicker from './FilePicker';

function DocumentField({ label, buttonText, name, value, placeholder, onFile, document, url }) {
  const { Item } = Form;

  const [file, setFile] = useState({ name: null });

  useEffect(() => {
    if (value) setFile({ name: value })
  }, [value])

  useEffect(() => {
    if (!document) setFile({ name: null })
    
  }, [document, url]);

  const handleFile = ({ target }) => {
    if (onFile) onFile(target.files[0])
    setFile(target.files[0])
  }

  return (
    <Item label={label} className="reusables-document-field">
      <div className="reusables-document-field-items-container">
        <div className="reusables-document-field-item">
          <Input
            value={file.name || url}
            placeholder={placeholder}
          />
          <FilePicker
            name="file"
            onChange={handleFile}
            type="forFiles"
          >
            <Button marginTop="0px" marginBottom="0px">
              { buttonText }
            </Button>
          </FilePicker>
        </div>
        <div className="reusables-document-field-item">
          {
            url && !file.name ? (
              <AntButton type="link">
                <a href={url} target="_blank">
                  Ir al archivo actual
                </a>
              </AntButton>
            ) : null
          }
        </div>
      </div>
    </Item>
  )
}

export default DocumentField;
