import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Icon } from 'antd';

function AdminNotificationsPanel({ user = { userType: 'Filial' }, slopes = [] }) {
  const { Title } = Typography;

  return (
    <div className="reusables-admin-notifications-panel">
      <Title level={3}>
        Notificaciones
        <Icon type="bell" size="2rem" style={{ marginLeft: 8 }} />
      </Title>

      {
        slopes.map((s, index) => (
          <div className="item" key={index}>
            <span>Afiliación pendiente</span>
            <span>{ `${s.basicData.name} ${s.basicData.dadSurname}` }</span>
            {
              user.userType === 'Admin' && (
                <Link to={`/admin/users/${s._id}`}>
                  Ver
                  <Icon type="eye" style={{ marginLeft: 8 }} />
                </Link>
              )
            }
          </div>
        ))
      }
    </div>
  );
}

export default AdminNotificationsPanel;
