import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import JustModal from '../reusables/JustMoadal';
import AdminModuleForm from './AdminModuleForm';
import ModuleContent from '../reusables/ModulesContent';

function AdminEventModules({
  addModule, modules, eventId,
  updateEventActivityAction, removeActivityAction,
}) {
  const { Title } = Typography;

  return (
    <div className="admin-event-modules">
      <ContainerItem className="editable-section-header">
        <Title level={3}>Módulos y atividades</Title>
        <JustModal
          buttonText="Agregar modulo ✚"
          childElement={<AdminModuleForm eventId={eventId} addModule={addModule} />}
        />
      </ContainerItem>
      {
        modules.map(module => (
          <ModuleContent
            module={module}
            eventId={eventId}
            updateEventActivityAction={updateEventActivityAction}
            removeActivity={removeActivityAction}
          />
        ))
      }
    </div>
  );
}

export default AdminEventModules;

AdminEventModules.propTypes = {
  modules: PropTypes.array,
};

AdminEventModules.defaultProps = {
  modules: [],
};
