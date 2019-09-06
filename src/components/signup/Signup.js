import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  createUserAction,
  resetUserStatus,
} from '../../store/ducks/userDuck';
import { populateEducationAction, resetEducationStatus } from '../../store/ducks/educationDuck';
import { populateActivitiesAction, resetActivitiesStatus } from '../../store/ducks/activitiesDuck';
import Stepper from './SignupStepper';
import GeneralDataForm from './forms/SignupGeneralDataForm';
import EducationForm from './forms/SignupEducationForm';
import SignupTeachingForm from './forms/SignupTeachingForm';
import SignupLaboralForm from './forms/SignupLaboralForm';
import SignupFiscalForm from './forms/SignupFiscalForm';

function Signup({
  user, createUserAction, resetUserStatus,
  fetching, status, history, match,
  education, populateEducationAction, resetEducationStatus,
  activities, populateActivitiesAction, resetActivitiesStatus,
  activitiesFetching, activitiesStatus,
}) {

  const currents = {
    general: 0, educacion: 1, docentes: 2, laborales: 3, fiscales: 4,
  };
  const currentLocation = match.path.split('/').pop();

  useEffect(() => {
    if (user._id) {
      populateEducationAction();
      populateActivitiesAction();
    }
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
        {
          currentLocation === 'docentes' && (
            <SignupTeachingForm activities={activities} resetStatus={resetActivitiesStatus} />
          )
        }
        {
          currentLocation === 'laborales' && (
            <SignupLaboralForm
              jobActivities={activities.jobs}
              resetStaus={resetActivitiesStatus}
              loading={activitiesFetching}
              status={activitiesStatus}
              resetStatus={resetActivitiesStatus}
            />
          )
        }
        {
          currentLocation === 'fiscales' && (
            <SignupFiscalForm />
          )
        }
      </div>
    </div>
  );
}

function mapStateToProps({ user, education, activities }) {
  return {
    user,
    fetching: user.fetching,
    status: user.status,
    education,
    activities,
    activitiesFetching: activities.fetching,
    activitiesStatus: activities.status,
  }
}

export default connect(
  mapStateToProps, {
    createUserAction,
    resetUserStatus,
    populateEducationAction,
    resetEducationStatus,
    populateActivitiesAction,
    resetActivitiesStatus,
  }
)(Signup);
