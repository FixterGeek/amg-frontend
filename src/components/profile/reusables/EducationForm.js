import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { populateInstitutionsAction } from '../../../store/ducks/institutionsDuck';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import TextField from '../../reusables/TextField';
import RangeDatePicker from '../reusables/RangeDatePicker';
import DatePicker from '../../reusables/DatePickerField';
import DocumentField from '../../reusables/DocumentField';
import CreateInstitution from '../reusables/CreateInstitutionModal';

function EducationForm({ user, institutions, onChange, populateInstitutionsAction }) {
  const [type, setType] = useState('Estudios');
  const [study, setStudy] = useState({
    user: '',
    major: null,
    institution: null,
    startDate: null,
    endDate: null,
    receptionDate: null,
    professionalLicence: null,
    ceduleFile: null,
    titleFile: null,
  })
  const [residence, setResidence] = useState({
    user: '',
    speciality: null,
    institution: null,
    startDate: null,
    endDate: null,
    specialityLicenceCopy: null,
    certificateFile: null,
  });
  const [internship, setInternship] = useState({
    user: '',
    institution: null,
    startDate: null,
    endDate: null,
  })


  useEffect(() => {
    if (type === 'Estudios') onChange({ type, ...study })
    if (type === 'Residencia') onChange({ type, ...residence })
    if (type === 'Internado') onChange({ type, ...internship })
  }, [study, residence, internship])

  useEffect(() => {
    setInternship({ ...internship, user: user._id });
    setStudy({ ...study, user: user._id });
    setResidence({ ...residence, user: user._id });
  }, [user]);

  useEffect(() => {
    if (!institutions[0]) {
      populateInstitutionsAction()
    }
  }, []);


  /* Handle Study */
  const handleStudy = ({ target }) => {
    const { name, value, moments } = target;

    if (moments) setStudy({ ...study, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setStudy({ ...study, [name]: value });
  };

  /* Handle Residence */
  const handleResidence = ({ target }) => {
    const { name, value, moments } = target;

    if (moments) setResidence({ ...residence, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setResidence({ ...residence, [name]: value });
  };

  /* Handle Internship */
  const handleInternship = ({ target }) => {
    const { name, value, moments } = target;

    if (moments) setInternship({ ...internship, startDate: moments[0].toString(), endDate: moments[1].toString() })
    else setInternship({ ...internship, [name]: value })
  };

  const handleCreateInstitutions = ({ data, type }) => {
    if (type === 'Estudios') setStudy({ ...study, institution: data._id })
    if (type === 'Residencia') setResidence({ ...residence, institution: data._id })
    if (type === 'Internado') setInternship({ ...internship, institution: data._id })
  }


  return (
    <form>
      <SelectField
        onChange={value => setType(value)}
        label="Tipo de educación"
        value={type}
      >
        {
          ['Estudios', 'Residencia', 'Internado'].map((opt, index) => (
            <OptionSelect key={index} value={opt}>
              { opt }
            </OptionSelect>
          ))
        }
      </SelectField>
      
      {
        type === 'Estudios' && (
          <div>
            <TextField
              onChange={handleStudy}
              value={study.major}
              name="major"
              label="Carrera"
            />

            {/* Modal for create institution */}
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Estudios', data })}
              forceTypes={['Escuela']}
              disabledOwn
            />

            <SelectField
              label="Institución"
              onChange={value => handleStudy({ target: { value, name: 'institution' } })}
              value={study.institution}>
              {
                institutions.filter(intn => intn.type === 'Escuela').map(institution => (
                  <OptionSelect key={institution._id} value={institution._id}>
                    { institution.name }
                  </OptionSelect>
                ))
              }
            </SelectField>
            <RangeDatePicker
              onChange={moments => handleStudy({ target: { moments, name: 'period' } })}
              dateOne={study.startDate}
              dateTwo={study.endDate}
              onlyMonth
              format="MM/YYYY"
              label="Periodo de estudios"
            />
            {
              study.endDate !== 'Actualidad' && study.endDate !== null ? (
                <DatePicker
                  onChange={moment => handleStudy({ target: { value: moment.toString(), name: 'receptionDate' } })}
                  value={study.receptionDate}
                  name="receptionDate"
                  label="Fecha de titulación"
                />
              ) : null
            }
            <TextField
              onChange={handleStudy}
              value={study.professionalLicence}
              name="professionalLicence"
              label="No. de cédula profesional"
            />
            <DocumentField
              label="Cédula profesional"
              fileTypes="forDocsAndImages"
              onFile={file => setStudy({ ...study, ceduleFile: file })}
              document={study.ceduleFile}
            />
            <DocumentField
              label="Título profesional"
              fileTypes="forDocsAndImages"
              onFile={file => setStudy({ ...study, titleFile: file })}
              document={study.titleFile}
            />
          </div>
        )
      }

      {
        type === 'Residencia' && (
          <div>
            <TextField
              onChange={handleResidence}
              value={residence.speciality}
              name="speciality"
              label="Especialidad"
            />
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Residencia', data })}
              forceTypes={['Hospital']}
              disabledOwn
            />
            <SelectField
              label="Institución"
              onChange={value => handleResidence({ target: { value, name: 'institution' } })}
              value={residence.institution}>
              {
                institutions.filter(intn => intn.type === 'Hospital').map(institution => (
                  <OptionSelect key={institution._id} value={institution._id}>
                    { institution.name }
                  </OptionSelect>
                ))
              }
            </SelectField>
            <RangeDatePicker
              onChange={moments => handleResidence({ target: { moments, name: 'period' } })}
              onlyMonth
              format="MM/YYYY"
              dateOne={residence.startDate}
              dateTwo={residence.endDate}
              label="Periodo de estudios"
            />
            <DocumentField
              label="Copia de certificado"
              fileTypes="forDocsAndImages"
              document={residence.certificateFile}
              onFile={file => setResidence({ ...residence, certificateFile: file })}
            />
          </div>
        )
      }

      {
        type === 'Internado' && (
          <div>
            <CreateInstitution
              onResult={(error, data) => handleCreateInstitutions({ type: 'Internado', data })}
              forceTypes={['Hospital']}
              disabledOwn
            />
            <SelectField
              label="Institución"
              onChange={value => handleInternship({ target: { value, name: 'institution' } })}
              value={internship.institution}>
              {
                institutions.filter(intn => intn.type === 'Hospital').map(institution => (
                  <OptionSelect key={institution._id} value={institution._id}>
                    { institution.name }
                  </OptionSelect>
                ))
              }
            </SelectField>
            <RangeDatePicker
              onChange={moments => handleInternship({ target: { moments, name: 'period' } })}
              onlyMonth
              format="MM/YYYY"
              dateOne={internship.startDate}
              dateTwo={internship.endDate}
              label="Periodo de estudios"
            />
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
