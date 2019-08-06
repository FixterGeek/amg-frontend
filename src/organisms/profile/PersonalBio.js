import React from 'react';

import DashoardContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';
import TextArea from '../../molecules/TextArea';

function PersonalBio() {
  return (
    <DashoardContainerItem className="personal-bio">
      <Button width="200px" line>Editar</Button>
      <TextArea rows={6} />
    </DashoardContainerItem>
  );
}

export default PersonalBio;
