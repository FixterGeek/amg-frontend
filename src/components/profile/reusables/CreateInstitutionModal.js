import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Modal, Checkbox } from 'antd';

import { pushLastInstitution } from '../../../store/ducks/institutionsDuck';
import { createInstitution } from '../../../services/institutionsServices';
import Button from '../../../atoms/Button';
import TextField from '../../../molecules/TextFields';
import SelectField from '../../../molecules/SelectField';
import states from '../../../organisms/forms/estados.json';
import Label from '../../../atoms/data-entry/Label';
import Upload from '../../admin/reusables/Upload'
import ImageGalleryPicker from '../../admin/reusables/ImageGalleryPicker'

function CreateInstitution({
  user, onResult, forceOwn = null, disabledOwn, forceTypes = null,
  pushLastInstitution,
}) {
  const [open, setOpen] = useState(false);
  const [own, setOwn] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [institution, setInstitution] = useState({
    name: null,
    type: null,
    president: null,
    location: {
      street: null,
      colony: null,
      zipCode: null,
      city: null,
      state: null,
    },
    logoURL: null,
  });
  

  useEffect(() => {
    if (forceOwn && !institution.owner) setInstitution({ ...institution, owner: user._id });
  }, [forceOwn]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'owner' || name === 'name' || name === 'president' || name === 'type') {
      setInstitution({ ...institution, [name]: value });
    } else {
      setInstitution({ ...institution, location: { ...institution.location, [name]: value } });
    }
  };


  const handleOwn = ({ target }) => {
    const { name, value, checked } = target;
    setOwn(checked);
    if (checked) setInstitution({ ...institution, owner: value });
    else setInstitution({ ...institution, owner: '' });
  };


  const handleSave = (event) => {
    event.preventDefault();
    setOpen(false);
    createInstitution(institution)
      .then(data => {
        onResult(null, data);
        pushLastInstitution(data);
      })
      .catch(({ response }) => onResult(response.data, null));
  };


  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="reusable-modal-create-intitution"
        bgColor="primary"
        line
      >
        Crear nueva institución
      </Button>
      <Modal
        onCancel={() => setOpen(false)}
        onOk={handleSave}
        visible={open}
      >
        {
          !disabledOwn && (
            <div>
              <Label>Institución propia</Label>
              <Checkbox
                onChange={() => handleOwn({
                  target: { name: 'owner', value: user._id, checked: !own } 
                })}
                disabled={forceOwn}
                checked={forceOwn || own}
              />
            </div>
          )
        }
        <SelectField
          onChange={value => handleChange({ target: { value, name: 'type' } })}
          options={forceTypes || ['Hospital', 'Escuela', 'Consultorio', 'Sociedad']}
          value={institution.type}
          label="Tipo de institución" />
        <TextField
          onChange={handleChange}
          value={institution.name}
          label="Nombre institución"
          name="name" />
        <Upload
          preview={institution.logoURL}
          onClick={() => setGalleryOpen(true)}
        />
        <TextField
          onChange={handleChange}
          value={institution.president}
          label="Presidente"
          name="president" />
        <TextField
          onChange={handleChange}
          value={institution.location.street}
          name="street"
          label="Dirección" />
        <TextField
          onChange={handleChange}
          value={institution.location.colony}
          name="colony"
          label="Colonia" />
        <TextField
          onChange={handleChange}
          value={institution.location.zipCode}
          name="zipCode"
          label="Código postal" />
        <TextField
          onChange={handleChange}
          value={institution.location.city}
          name="city"
          label="Ciudad" />
        <SelectField
          onChange={value => handleChange({ target: { value, name: 'state' } })}
          value={institution.location.state}
          name="state"
          label="Estado"
          options={states} />
      </Modal>
      <ImageGalleryPicker
        refName={"users"}
        visible={galleryOpen}
        onChange={link => setInstitution({ ...institution, logoURL: link })}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}

function mapStateToProps({ institutions }) {
  return { institutions }
}

export default connect(mapStateToProps, { pushLastInstitution })(CreateInstitution);
