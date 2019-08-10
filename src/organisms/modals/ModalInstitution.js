import React, { useState } from 'react';
import useForm from 'react-hook-form';

import { Button, Modal, Typography } from 'antd';

import Input from '../../molecules/data-entrie/Input';
import SelectField from '../../molecules/SelectField';
import FilePicker from '../../atoms/FilePicker';

function ModalInstitution() {
  const { Title } = Typography;

  const { register, handleSubmit, watch, errors } = useForm();
  const [open, setOpen] = useState(false);


  const handleSave = (data) => {
    console.log(data);
  };

  console.log(watch(['zipCode', 'outdoorNumber']));
  console.log(errors);

  return (
    <div>
      <Button type="link" onClick={() => setOpen(true)}>Agregar Institución</Button>
      <Modal
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okButtonProps={{ className: 'amg-button' }}
        cancelButtonProps={{ className: 'amg-button', style: { backgroundColor: '#e24c4c' } }}
        okText="Crear"
        cancelText="Cancelar"
        visible={open}
        title="Agregar Institución">

        <form onSubmit={handleSubmit(handleSave)}>
          <Input label="Nombre">
            <input name="name" ref={register} />
          </Input>
          <Input label="Presidente/Representante">
            <input name="president" ref={register} />
          </Input>
          <SelectField
            label="Tipo de institución"
            options={[
              { value: 'Hospital', text: 'Hospital' },
              { value: 'Escuela', text: 'Escuela' },
              { value: 'Consultorio', text: 'Consultorio' },
              { value: 'Sociedad', text: 'Sociedad' },
            ]} />

          <Title level={4}>Dirección</Title>

          <Input label="Lugar">
            <input name="addressName" ref={register} />
          </Input>
          <Input label="Calle">
            <input name="street" ref={register} />
          </Input>
          <Input label="Número exterior">
            <input name="outdoorNumber" ref={register} />
          </Input>
          <Input label="Número interior">
            <input name="interiorNumber" ref={register} />
          </Input>
          <Input label="Colonia">
            <input name="colony" ref={register} />
          </Input>
          <Input label="Código postal">
            <input name="zipCode" ref={register({ pattern: /([0-9])/ })} />
          </Input>
        </form>

        {/* <TextField label="Nombre" name="name" />

        <Title level={4}>Dirección</Title>

        <TextField label="Lugar" name="addressName" />
        <TextField label="Calle" name="street" />
        <TextField label="Número exterior" name="outdoorNumber" />
        <TextField label="Número interior" name="interiorNumber" />
        <TextField label="Colonia" name="colony" />
        <TextField label="Código postal" name="zipCode" />
        <TextField label="Ciudad" name="city" />
        <TextField label="Estado" name="state" />

        <TextField label="Número Telefonico" name="phones" />
        <TextField label="Correo electrónico" name="email" />
        <FilePicker type="forImages"> Logo/Foto </FilePicker> */}

      </Modal>
    </div>
  );
}

export default ModalInstitution;
