import React from 'react';
import { connect } from 'react-redux';

import { createUserAction } from '../../store/ducks/userDuck';
import Stepper from './SignupStepper';
import GeneralDataForm from './forms/SignupGeneralDataForm';

function Signup({
  user, createUserAction,
}) {
  return (
    <div className="signup">
      <Stepper />
      <div className="signup-form-container">
        <GeneralDataForm user={user} dispatch={createUserAction} />
      </div>
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

export default connect(
  mapStateToProps, {
    createUserAction,
  }
)(Signup);
