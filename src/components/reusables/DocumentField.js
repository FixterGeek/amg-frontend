import React, { useState, useEffect } from 'react';

import { Form, Input } from 'antd';

import Button from './Button';
import FilePicker from './FilePicker';

function DocumentField({ label, buttonText, name, value, placeholder, onFile, document }) {
  const { Item } = Form;

  const [file, setFile] = useState({ name: null });

  useEffect(() => {
    if (value) setFile({ name: value })
  }, [value])

  useEffect(() => {
    if (!document) setFile({ name: null })
  }, [document]);

  const handleFile = ({ target }) => {
    if (onFile) onFile(target.files[0])
    setFile(target.files[0])
  }

  return (
    <Item label={label} className="reusables-document-field">
      <Input
        value={file.name}
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
    </Item>
  )
}

export default DocumentField;
