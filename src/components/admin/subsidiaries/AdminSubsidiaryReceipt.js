import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Typography, AutoComplete, List,
  Avatar, Form, Button as AmgButton,
  Icon, Empty, Switch, Input
} from 'antd';

import {
  workingOn,
  createOrUpdateFilialPayment,
  fetching as ft,
  populateSubsidiaryPayments,
  setWorkingOn,
} from '../../../store/ducks/paymentsDuck';
import { populateSubsidiaries } from '../../../store/ducks/subsidiaryDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import ImagePicker from '../../reusables/ImagePicker';
import Chat from '../../reusables/Chat';
import Spinner from '../../reusables/Spinner';
import ReceiptConfirm from './reusables/ReceiptConfirm';
import { uploadFile } from '../../../tools/firebaseTools';
import moment from 'moment';

function AdminSubsidiaryReceipt({ 
  users = [], onCancel, workingOn,
  working, filial = {}, setWorkingOn,
  createOrUpdateFilialPayment,
  fetching, match, payment,
  populateSubsidiaries,
  populateSubsidiaryPayments,
  user,
}) {
  const { Title } = Typography;
  const { Item } = List;
  const { TextArea } = Input;
  const { params } = match;

  const [usersInList, setUserInList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(usersInList);

  useEffect(() => {
    populateSubsidiaries();
    populateSubsidiaryPayments(params.id);
  }, []);

  useEffect(() => {
    if (payment && payment !== 'empty') {
      console.log(payment);
      setWorkingOn(payment);
      setUserInList(payment.users);
    }
  }, [payment]);

  useEffect(() => {
    workingOn(working, 'users', usersInList.map(u => u._id));
  }, [usersInList.length])

  useEffect(() => {
    if (filial._id) workingOn(working, 'filial', filial._id);
  }, [filial._id])

  const handleCancel = () => {
    if (onCancel) onCancel(false);
  };

  const handleSwitch = (checked) => {
    console.log(checked);
    if (checked !== working.paid) handleSave('approve', !working.paid);
  };

  const handleSave = async (paid, v) => {
    ft();
    const data = working;
    const fbRef = `/filiales/${filial._id}/recibos/`;

    data.date = moment().toString();
    if (working.receiptFile) data.recipetURL = await uploadFile(fbRef, working.receiptFile).then(url => url);
    if (paid === 'approve') data.paid = v;
  
    createOrUpdateFilialPayment(data);
    setModalOpen(false);
  }

  return (
    <section className="admin-subsidiary-receipt">
      { fetching && <Spinner fullScrren /> }
      <ReceiptConfirm
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleSave}
        users={usersInList}
      />
      <ContainerItem className="dash-item-center">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={3}>
            { payment && payment !== 'empty' ? `Comprobante No. ${payment._id}` : 'Subir comprobante AMG' }
          </Title>
          {
            user.userType === 'Admin' && (
              <Switch
                onChange={handleSwitch}
                checkedChildren="Aprobado"
                unCheckedChildren="Declinado"
                checked={working.paid}
              />
            )
          }
        </div>
        <ContainerItem className="admin-subsidiary-receipt-receipt">
          <ImagePicker
            onChange={file => workingOn(working, 'receiptFile', file)}
            className="receipt-image"
            label="Comprobante de pago"
            url={payment ? payment.recipetURL : null}
          />
        </ContainerItem>
        <ContainerItem>
          <TextArea
            onChange={({ target }) => workingOn(working, 'chat', target.value)}
            value={working.chat.description || null}          
          />
        </ContainerItem>
        <ContainerItem className="admin-subsidiary-receipt-content">
          <div className="users-list">
            <Form.Item label="Buscar y agregar usuario">
              <AutoComplete
                onChange={v => {
                  setUserInList(u => [users.filter(us => us._id === v)[0], ...u])
                }}
                filterOption={(inputValue, option) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                value={null}
              >
                {
                  users.map(u => (
                    <AutoComplete.Option key={u._id} value={u._id}>
                      { `${u.basicData.name} ${u.basicData.dadSurname} ${u.basicData.momSurname || ''}` }
                    </AutoComplete.Option>
                  ))
                }
              </AutoComplete>
            </Form.Item>
            <List>
              {
                usersInList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sin usuarios asignados" />
              }
              {
                usersInList.map(u => (
                  <Item key={u._id}>
                    <Item.Meta
                      avatar={<Avatar src={u.basicData.photoURL} />}
                      title={`${u.basicData.name} ${u.basicData.dadSurname}`}
                      description={u.email}
                    />
                    <AmgButton
                      type="link"
                      style={{ color: '#e24c4c' }}
                      onClick={() => setUserInList(arr => arr.filter(us => us._id !== u._id))}
                    >
                      Quitar
                      <Icon type="close" />
                    </AmgButton>
                  </Item>
                ))
              }
            </List>
          </div>
          {/* <Chat
            chat={working.chat}
            onNewMessage={messageObject => workingOn(working, 'chat', messageObject)}
            toUser={{ name: `Filial de ${filial.state}`, photoURL: filial.photoURL }}
          /> */}
        </ContainerItem>
        {
          !payment && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button line onClick={handleCancel} >
                Cancelar
              </Button>
              <Button onClick={() => setModalOpen(true)}>
                Siguiente
              </Button>
            </div>
          )
        }
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ subsidiary, user, payment: { payment } }, { match }) {
  const { params } = match;

  return {
    working: payment.workingOn,
    fetching: payment.fetching,
    filial: subsidiary.array.filter(s => s._id === params.id)[0],
    payment: payment.subsidiaryPayments.filter(p => p._id === params.paymentId)[0],
    user,
  }
}

export default withRouter(
  connect(
    mapStateToProps, {
      workingOn,
      setWorkingOn,
      createOrUpdateFilialPayment,
      populateSubsidiaries,
      populateSubsidiaryPayments,
    }
  )(AdminSubsidiaryReceipt)
);
