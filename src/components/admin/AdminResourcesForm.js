import React, { useState } from 'react';

import { Typography, Form } from 'antd';

import ContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';
import TextField from '../reusables/TextField';
import DocumentField from '../reusables/DocumentField';
import ImagePicker from '../reusables/ImagePicker';

function ResourcesForm({ createResourceAction }) {
  const { Title } = Typography;

  const [resource, setResource] = useState({
    preview: null,
    document: null,
    title: null,
    subtitle: null,
    footer: null,
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setResource({ ...resource, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createResourceAction(resource)
  }

  return (
    <section>
      <ContainerItem>
        <Title>Nuevo Recurso</Title>
      </ContainerItem>
      <ContainerItem>
        <Form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            label="Titutlo"
            name="title"
            value={resource.title}
          />
          <TextField
            onChange={handleChange}
            label="Subtitulo"
            name="subtitle"
            value={resource.subtitle}
          />
          <TextField
            onChange={handleChange}
            label="Pie de caja"
            name="footer"
            value={resource.footer}
          />
          <ImagePicker
            onChange={file => handleChange({ target: { name: 'preview', value: file } })}
            label="Portada"
          />
          <DocumentField
            onFile={file => handleChange({ target: { name: 'document', value: file }})}
            label="Documento/Archivo"
            buttonText="Agregar"
          />
          <Button htmlType="submit" width="100%">
            Subir recurso
          </Button>
        </Form>
      </ContainerItem>
    </section>
  )
}

export default ResourcesForm;
