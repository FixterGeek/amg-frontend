import React, { useState, useEffect } from 'react';

import { Icon } from 'antd';

import DashoardContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import TextArea from '../../../molecules/TextArea';

function PersonalBio({ onChange, onSave, value }) {
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (onChange) onChange(bio);
  }, [bio]);

  useEffect(() => {
    if (!bio) setBio(value)
  }, [value])

  const handleSave = () => {
    if (onSave) onSave(bio);
  };


  return (
    <DashoardContainerItem className="personal-bio">
      <Button onClick={handleSave} width="180px" line>
        Guardar Biografia
        <Icon type="save" />
      </Button>
      <TextArea
        onChange={({ target }) => setBio(target.value)}
        rows={6}
        value={bio}
        placeholder="Cuentanos sobre tí..."
      />
    </DashoardContainerItem>
  );
}

export default PersonalBio;
