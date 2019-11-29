import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  createUserAction,
  resetUserStatus,
  updateUserAction,
} from '../../store/ducks/userDuck';
import { populateEducationAction } from '../../store/ducks/educationDuck';
import { populateActivitiesAction, resetActivitiesStatus } from '../../store/ducks/activitiesDuck';
import { populateSubsidiaries } from '../../store/ducks/subsidiaryDuck';
import Stepper from './SignupStepper';
import GeneralDataForm from './forms/SignupGeneralDataForm';
import EducationForm from './forms/SignupEducationForm';
import SignupTeachingForm from './forms/SignupTeachingForm';
import SignupLaboralForm from './forms/SignupLaboralForm';
import SignupFiscalForm from './forms/SignupFiscalForm';

function Signup({
  user, createUserAction, resetUserStatus,
  fetching, status, history, match,
  education, populateEducationAction,
  activities, populateActivitiesAction, resetActivitiesStatus,
  activitiesFetching, activitiesStatus, updateUserAction,
  educationFetching, educationStatus, subsidiaries,
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

  useEffect(() => {
    if (user.id) history.push('/dashboard');
  }, [user]);

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
              subsidiaries={subsidiaries}
            />
          )
        }
        {
          currentLocation === 'educacion' && (
            <EducationForm
              user={user}
              education={education}
              loading={educationFetching}
              status={educationStatus}
            />
          )
        }
        {
          currentLocation === 'docentes' && (
            <SignupTeachingForm
              activities={activities}
              resetStatus={resetActivitiesStatus}
              loading={activitiesFetching}
              status={activitiesStatus}
            />
          )
        }
        {
          currentLocation === 'laborales' && (
            <SignupLaboralForm
              jobActivities={activities.jobs}
              loading={activitiesFetching}
              status={activitiesStatus}
              resetStatus={resetActivitiesStatus}
            />
          )
        }
        {
          currentLocation === 'fiscales' && (
            <SignupFiscalForm
              user={user}
              dispatch={updateUserAction}
              loading={fetching}
              status={status}
              resetStatus={resetUserStatus}
              history={history}
              firstTime
            />
          )
        }
      </div>
    </div>
  );
}

function mapStateToProps({ user, education, activities, subsidiary }) {
  return {
    user,
    fetching: user.fetching,
    status: user.status,
    education,
    activities,
    activitiesFetching: activities.fetching,
    activitiesStatus: activities.status,
    educationFetching: education.fetching,
    educationStatus: education.status,
    subsidiaries: subsidiary.array,
  }
}

export default connect(
  mapStateToProps, {
    createUserAction,
    resetUserStatus,
    populateEducationAction,
    populateActivitiesAction,
    resetActivitiesStatus,
    updateUserAction,
    populateSubsidiaries,
  }
)(Signup);
