import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  createUserAction,
  resetUserStatus,
} from '../../store/ducks/userDuck';
import { populateEducationAction, resetEducationStatus } from '../../store/ducks/educationDuck';
import Stepper from './SignupStepper';
import GeneralDataForm from './forms/SignupGeneralDataForm';
import EducationForm from './forms/SignupEducationForm';

function Signup({
  user, createUserAction, resetUserStatus,
  fetching, status, history, match,
  education = { studies: [], internships: [], recidences: [] },
  populateEducationAction, resetEducationStatus,
}) {

  const currents = { general: 0, educacion: 1, docentes: 2 };
  const currentLocation = match.path.split('/').pop();

  useEffect(() => {
    populateEducationAction();
  }, [])

  return (
    <div className="signup">
      <Stepper current={currents[currentLocation]} />
      <div className="signup-form-container">
        {
          currentLocation === 'general' && (
            <GeneralDataForm
              user={user}
              dispatch={createUserAction}
              loading={fetching}
              resetStatus={resetUserStatus}
              status={status}
              history={history}
            />
          )
        }
        {
          currentLocation === 'educacion' && (
            <EducationForm
              user={user}
              education={education}
              resetStatus={resetEducationStatus}
            />
          )
        }
      </div>
    </div>
  );
}

function mapStateToProps({ user, education }) {
  return {
    user,
    fetching: user.fetching,
    status: user.status,
    education,
  }
}

export default connect(
  mapStateToProps, {
    createUserAction,
    resetUserStatus,
    populateEducationAction,
    resetEducationStatus,
  }
)(Signup);
