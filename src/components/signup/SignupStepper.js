import React from 'react';

import PropTypes from 'prop-types';

import { Steps } from 'antd';

import logo from '../../assets/gastro@mini_white.png';

function SignupStepper({ current }) {
  const { Step } = Steps;
  return (
    <div className="signup-stepper">
      <div className="signup-stepper-container">
        <div className="signup-stepper-logo">
          <img src={logo} alt="GASTRO" />
        </div>
        <div className="signup-stepper-steps">
          <Steps direction="vertical" current={current}>
            <Step title="Datos generales" />
            <Step title="Educación" />
            <Step title="Actividades docentes" />
            <Step title="Datos laborales " />
            <Step title="Datos fiscales" />
          </Steps>
        </div>
      </div>
    </div>
  );
}

export default SignupStepper;

SignupStepper.propTypes = {
  current: PropTypes.number,
};

SignupStepper.defaultProps = {
  current: 0,
};
