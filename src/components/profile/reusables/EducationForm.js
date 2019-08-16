import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { populateInstitutionsAction } from '../../../store/ducks/institutionsDuck';
import SelectField from '../../../molecules/SelectField';
import TextField from '../../../molecules/TextFields';
import RangeDatePicker from '../reusables/RangeDatePicker';
import DatePicker from '../../../molecules/DatePicker';
import CreateInstitution from '../reusables/CreateInstitutionModal';

function EducationForm({ user, institutions, onChange, populateInstitutionsAction }) {
  const [type, setType] = useState('Estudios');
  const [study, setStudy] = useState({
    user: null,
    major: null,
    institution: null,
    startDate: null,
    endDate: null,
    receptionDate: null,
    professionalLicence: null,
  })
  const [residence, setResidence] = useState({
    user: null,
    speciality: null,
    institution: null,
    startDate: null,
    endDate: null,
    specialityLicenceCopy: null,
  });
  const [internship, setInternship] = useState({
    user: null,
    institution: null,
    startDate: null,
    endDate: null,
  })


  useEffect(() => {
    setInternship({ ...internship, user: user._id });
    setStudy({ ...study, user: user._id });
    setResidence({ ...residence, user: user._id });
  }, [user]);

  useEffect(() => {
    if (!institutions[0]) {
      populateInstitutionsAction()
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }, []);


  const handleStudy = ({ target }) => {
    const { name, value, moments } = target;

    if (moments) setStudy({ ...study, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setStudy({ ...study, [name]: value })

    onChange({ type, ...study })
  };

  const handleResidence = ({ target }) => {
    const { name, value, moments } = target;

    if (moments) setResidence({ ...residence, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setResidence({ ...residence, [name]: value })

    onChange({ type, ...residence })
  };

  const handleInternship = ({ target }) => {
    console.log('intership');
    const { name, value, moments } = target;

    if (moments) setInternship({ ...internship, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setInternship({ ...internship, [name]: value })

    onChange({ type, ...internship })
  };

  const handleCreateInstitutions = ({ data, type }) => {
    console.log(data, type)
    if (type === 'Estudios') setStudy({ ...study, institution: data._id })
    if (type === 'Recidencia') setResidence({ ...residence, institution: data._id })
    if (type === 'Internado') setInternship({ ...internship, institution: data._id })
  }

  console.log(institutions)


  return (
    <form>
      <SelectField
        onChange={value => setType(value)}
        value={type}
        label="Tipo de educación"
        options={['Estudios', 'Recidencia', 'Internado']} />
      
      {
        type === 'Estudios' && (
          <div>
            <TextField
              onChange={handleStudy}
              value={study.major}
              name="major"
              label="Carrera" />
            <SelectField
              onChange={value => handleStudy({ target: { value, name: 'institution' } })}
              value={study.institution}
              useKeys={['_id', '_id', 'name']}
              options={institutions.filter(intn => intn.type === 'Escuela')}
              label="Institución" />
            <RangeDatePicker
              onChange={moments => handleStudy({ target: { moments, name: 'period' } })}
              dateOne={study.startDate}
              dateTwo={study.endDate}
              label="Periodo de estudios" />
            <DatePicker
              onChange={moment => handleStudy({ target: { value: moment.toString(), name: 'receptionDate' } })}
              value={study.receptionDate}
              name="receptionData"
              label="Año de titulación" />
            <TextField
              onChange={handleStudy}
              value={study.professionalLicence}
              name="professionalLicence"
              label="Cédula profesional" />
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Estudios', data })}
              forceTypes={['Escuela']} />
          </div>
        )
      }

      {
        type === 'Recidencia' && (
          <div>
            <TextField
              onChange={handleResidence}
              value={residence.speciality}
              name="speciality"
              label="Especialidad" />
            <SelectField
              onChange={value => handleResidence({ target: { value, name: 'institution' } })}
              value={residence.institution}
              useKeys={['_id', '_id', 'name']}
              options={institutions.filter(intn => intn.type === 'Hospital')}
              label="Institución" />
            <RangeDatePicker
              onChange={moments => handleResidence({ target: { moments, name: 'period' } })}
              dateOne={residence.startDate}
              dateTwo={residence.endDate}
              label="Periodo de estudios" />
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Recidencia', data })}
              forceTypes={['Hospital']} />
          </div>
        )
      }

      {
        type === 'Internado' && (
          <div>
            <SelectField
              onChange={value => handleInternship({ target: { value, name: 'institution' } })}
              value={internship.institution}
              useKeys={['_id', '_id', 'name']}
              options={institutions.filter(intn => intn.type === 'Hospital')}
              label="Institución" />
            <RangeDatePicker
              onChange={moments => handleInternship({ target: { moments, name: 'period' } })}
              dateOne={internship.startDate}
              dateTwo={internship.endDate}
              label="Periodo de estudios" />
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Internado', data })}
              forceTypes={['Hospital']} />
          </div>
        )
      }
    </form>
  );
}

function mapSatateToProps({ institutions }) {
  return {
    institutions: institutions.institutionsArray,
  }
}

export default connect(mapSatateToProps, { populateInstitutionsAction })(EducationForm);
