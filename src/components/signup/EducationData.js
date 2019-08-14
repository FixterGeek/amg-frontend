import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { Typography, Icon } from 'antd';

import Container from '../../atoms/layout/Container';
import Gastro from '../../atoms/gastro/Gastro';
import EducationDataForm from '../../organisms/forms/EducationDataForm';
import InternshipDataForm from '../../organisms/forms/InternshipDataForm';
import CoursesDataForm from '../../organisms/forms/CoursesDataForm';
import Steper from '../../organisms/Steper';
import Button from '../../atoms/Button';
import Spinner from '../../atoms/Spinner';

import ContainerItem from '../../atoms/DashboardContainerItem';

const EducationData = ({ signup }) => {
  const { Title } = Typography;

  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState({
    studie: {
      institution: null,
      major: null,
      startDate: null,
      endDate: null,
      receptionDate: null,
      professionalLicence: null,
    },
    internship: {
      institution: null,
      startDate: null,
      endDate: null,
    },
  });

  const setStudie = (payload) => {
    setEducation({ ...education, studie: { ...education.studie, ...payload } });
  };

  const setInternship = (payload) => {
    setEducation({ ...education, internship: { ...education.internship, ...payload } });
  };

  const handleSave = () => {
    setLoading(true);
    localStorage.signup = JSON.stringify(signup);
    // esto puede cambiar
    // Promise.all([
    // createStudie({ ...education.studie }),
    // createInter({ ...education.studie }),
    // createPostStudy({ ...education.studie })
    // ])
    // .then(([res1,res2,res3])=>{
    // })


    // .then((data) => {
    //   console.log(data);
    //   setLoading(false);
    // })
    // .catch(({ response }) => {
    //   console.log(response);
    //   setLoading(false);
    // });
  };

  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper />
      </div>

      <div className="signup-container-rigth">
        {loading && <Spinner tip="Guardando" />}
        <Button onClick={handleSave} className="reusable-save-button" line>
          Guardar
          <Icon type="save" />
        </Button>
        <ContainerItem>
          <Title level={1} style={{ margin: 0 }}>
            Educación
          </Title>
          <Title level={4} style={{ margin: 0 }}>
            Educación profesional
          </Title>
        </ContainerItem>

        <ContainerItem>
          <EducationDataForm studie={education.studie} setStudie={setStudie} />
        </ContainerItem>

        <ContainerItem>
          <Title level={4}>
            Internado de pregrado
          </Title>
        </ContainerItem>

        <InternshipDataForm
          internship={education.internship}
          setInternship={setInternship} />
        <Container flexGrow={1} height="100px">
          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>
              Cursos de posgrado
            </Title>
          </div>
        </Container>
        {/* <CoursesDataForm /> */}
        <Button width="100%">
          <Link to="/signup/laboral">Siguiente</Link>
        </Button>
      </div>
    </div>
  );
};

function mapState({ signup }) {
  return { signup };
}

export default connect(mapState)(EducationData);
