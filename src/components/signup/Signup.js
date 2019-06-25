import React from "react";

import { Typography } from "antd";

import SignupForm from "../../organisms/SignupForm";
import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import { palette, size } from "../../styles/theme";

export default () => {
  const { Text, Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap"
    >
      <Container className="signup-left" height="100vh" width="30%">
        <Container bgColor={palette.secondary} />
      </Container>
      <Container className="signup-right" height="100vh" width="70%">
        <Container
          alignItems="flex-start"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
          style={{
            maxWidth: "445px",
            maxHeight: "100vh",
            flexDirection: "column"
          }}
          width="30%"
        />
        <Container width="70%">
          <Container flexGrow={1} height="100px">
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ margin: 0 }}>
                Datos generales{" "}
              </Title>
            </div>
          </Container>
          <SignupForm />
        </Container>
      </Container>
    </FullScreenContainer>
  );
};
