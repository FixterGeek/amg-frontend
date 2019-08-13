import React, { useState } from "react";
import { Typography } from "antd";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import Gastro from "../../atoms/gastro/Gastro";
import { palette, size } from "../../styles/theme";
import EducationDataForm from "../../organisms/forms/EducationDataForm";
import InternshipDataForm from "../../organisms/forms/InternshipDataForm";
import CoursesDataForm from "../../organisms/forms/CoursesDataForm";
import Steper from "../../organisms/Steper";

const EducationData = () => {
  const { Title } = Typography;

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

  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap"
    >
      <Container
        alignItems="flex-start"
        className="signup-left"
        height="100vh"
        width="30%"
        bgColor={palette.secondary}
        paddingTop={size.largePadding}
        paddingBottom={size.largePadding}
      >
        <Gastro />
        <Steper />
      </Container>

      <Container className="signup-rigth" height="100vh" width="65%">
        <Container flexGrow={1} height="100px">
          <div style={{ textAlign: "center" }}>
            <Title level={1} style={{ margin: 0 }}>
              Educación
            </Title>
            <Title level={4} style={{ margin: 0 }}>
              Educación profesional
            </Title>
          </div>
        </Container>
        <EducationDataForm studie={education.studie} setStudie={setStudie} />
        <Container flexGrow={1} height="100px">
          <div style={{ textAlign: "center" }}>
            <Title level={4} style={{ margin: 0 }}>
              Internado de pregrado
            </Title>
          </div>
        </Container>
        <InternshipDataForm
          internship={education.internship}
          setInternship={setInternship} />
        <Container flexGrow={1} height="100px">
          <div style={{ textAlign: "center" }}>
            <Title level={4} style={{ margin: 0 }}>
              Cursos de posgrado
            </Title>
          </div>
        </Container>
        {/* <CoursesDataForm /> */}
      </Container>
    </FullScreenContainer>
  );
};

export default EducationData;
