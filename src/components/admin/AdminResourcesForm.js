import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Form, message } from 'antd';

import { createResourceAction, resetStatus } from '../../store/ducks/resourceDuck';
import useSweet from '../../hooks/useSweetAlert';
import ContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';
import TextField from '../reusables/TextField';
import DocumentField from '../reusables/DocumentField';
import ImagePicker from '../reusables/ImagePicker';
import SelectField, { OptionSelect } from '../reusables/SelectField';
import Spinner from '../reusables/Spinner';

function ResourcesForm({ fetching, status, createResourceAction, resetStatus }) {
  const { Title } = Typography;

  const initialState = {
    tipo: null,
    preview: null,
    document: null,
    title: null,
    authors: null,
    volume: null,
    publishedAt: null,
  };

  const { successAlert, errorAlert } = useSweet();
  const [resource, setResource] = useState(initialState);

  useEffect(() => {
    if (status === 'success') {
      successAlert({ text: 'Recurso guardado' })
      setResource(initialState)
      resetStatus();
    }

    if (status === 'error' ) errorAlert({})
  }, [fetching])

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
        <Title>Subir Recurso</Title>
      </ContainerItem>
      <ContainerItem>
        <Form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          { fetching && <Spinner /> }
          <SelectField
            onChange={value => handleChange({ target: { name:'tipo', value } })}
            value={resource.tipo}
            label="Biblioteca" >
            <OptionSelect value="Guías y consensos">
              Guías y consensos
            </OptionSelect>
            <OptionSelect value="Publicaciones">
              Publicaciones
            </OptionSelect>
          </SelectField>

          <TextField
            onChange={handleChange}
            label="Nombre"
            name="title"
            value={resource.title}
          />

          <TextField
            onChange={handleChange}
            label="Autor(es)"
            name="authors"
            value={resource.authors}
          />

          <TextField
            onChange={handleChange}
            label="Volumen al que pertenecen"
            name="volume"
            value={resource.volume}
          />

          <TextField
            onChange={handleChange}
            label="Año de publicación"
            name="publishedAt"
            value={resource.publishedAt}
          />

          <ImagePicker
            onChange={file => handleChange({ target: { name: 'preview', value: file } })}
            label="Portada"
            file={resource.preview}
          />

          <DocumentField
            onFile={file => handleChange({ target: { name: 'document', value: file }})}
            document={resource.document}
            label="Archivo"
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

function mapStateToProps({ resources }) {
  return {
    resources,
    fetching: resources.fetching,
    status: resources.status,
  }
}

export default connect(
  mapStateToProps, {
    createResourceAction,
    resetStatus,
  }
)(ResourcesForm);
