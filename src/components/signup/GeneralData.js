import React, { useState } from 'react';
import { Typography } from 'antd';

import Gastro from '../../atoms/gastro/Gastro';
import { palette, size } from '../../styles/theme';
import GeneralDataForm from '../../organisms/forms/GeneralDataForm';
import Steper from '../../organisms/Steper';
import ContainerItem from '../../atoms/DashboardContainerItem';
import Upload from '../admin/reusables/Upload';
import ImageGalleryPicker from '../admin/reusables/ImageGalleryPicker'

const GeneralData = () => {
  const { Title } = Typography;

  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper alignItems="center" />
      </div>

      <div className="signup-container-rigth">
        <ContainerItem>
          <Title className="title-left" level={1}>
            Datos generales
          </Title>
          <ContainerItem>
            <GeneralDataForm />
          </ContainerItem>
        </ContainerItem>
      </div>
    </div>
  );
};

export default GeneralData;
