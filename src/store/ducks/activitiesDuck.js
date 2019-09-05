/* eslint-disable no-case-declarations */
import { createActivity as create, getActivitiesForUser } from '../../services/activitiesServices';

const activitiesState = {
  activitiesArray: [],
  teachingActivities: [],
  hospitalActivities: [],
  medicalSocieties: [],
  jobs: [],
  newActivity: null,
  fetching: false,
  status: null,
};

const RESET_ACTIVITY_STATUS = 'RESET_ACTIVITY_STATUS';
const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';

const POPULATE_ACTIVITIES = 'POPULATE_ACTIVITIES';
const POPULATE_ACTIVITIES_SUCCES = 'POPULATE_ACTIVITIES_SUCCESS';
const POPULATE_ACTIVITIES_ERROR = 'POPULATE_ACTIVITIES_ERROR';

// Actions creator
// Reset status
export function resetActivitiesStatus() {
  return { type: RESET_ACTIVITY_STATUS };
}

// Create activity
export function createActivity() {
  return { type: CREATE_ACTIVITY };
}

export function createActivitySuccess(activityData) {
  return { type: CREATE_ACTIVITY_SUCCESS, payload: activityData };
}

export function createActivityError(error) {
  return { type: CREATE_ACTIVITY_ERROR, payload: error };
}


// Populate activities
export function populateActivities() {
  return { type: POPULATE_ACTIVITIES };
}

export function populateActivitiesSuccess(activitiesArray) {
  return { type: POPULATE_ACTIVITIES_SUCCES, payload: activitiesArray };
}

export function populateActivitiesError(error) {
  return { type: POPULATE_ACTIVITIES_ERROR, payload: error };
}


// Thunks
// Create activity
export const createActivityAction = activityData => (dispatch) => {
  dispatch(createActivity());
  return create(activityData)
    .then((data) => {
      const localActivities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
      const teachingActivity = data.type === 'Docente' ? data : null;
      const hospitalActivity = data.type === 'Hospitalaria' ? data : null;
      const medicalSociety = data.type === 'Sociedad' ? data : null;
      const job = data.type === 'Laboral' ? data : null;

      localStorage.activities = JSON.stringify([data, ...localActivities]);
      dispatch(createActivitySuccess({
        data, teachingActivity, hospitalActivity, medicalSociety, job,
      }));
      return data;
    })
    .catch(({ response }) => {
      dispatch(createActivityError(response));
      return response;
    });
};


// Populate activities
export const populateActivitiesAction = () => (dispatch) => {
  dispatch(populateActivities);

  if (localStorage.activities) {
    const data = JSON.parse(localStorage.activities);
    const teachingActivities = data.filter(activity => activity.type === 'Docente');
    const hospitalActivities = data.filter(activity => activity.type === 'Hospitalaria');
    const medicalSocieties = data.filter(activity => activity.type === 'Sociedad');
    const jobs = data.filter(activity => activity.type === 'Laboral');
    dispatch(populateActivitiesSuccess({
      array: data, teachingActivities, hospitalActivities, medicalSocieties, jobs,
    }));
  } else {
    return getActivitiesForUser()
      .then((data) => {
        const teachingActivities = data.filter(activity => activity.type === 'Docente');
        const hospitalActivities = data.filter(activity => activity.type === 'Hospitalaria');
        const medicalSocieties = data.filter(activity => activity.type === 'Sociedad');
        const jobs = data.filter(activity => activity.type === 'Laboral');

        localStorage.activities = JSON.stringify(data);
        dispatch(populateActivitiesSuccess({
          array: data, teachingActivities, hospitalActivities, medicalSocieties, jobs,
        }));
        return data;
      })
      .catch(({ response }) => {
        dispatch(populateActivitiesError(response.data.message));
      });
  }
};


// Reducer
export default function reducer(state = activitiesState, action) {
  switch (action.type) {
    /* Reset Status */
    case RESET_ACTIVITY_STATUS:
      return { ...state, status: null };
    /* Create activity */
    case CREATE_ACTIVITY:
      return { ...state, fetching: true };
    case CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        activitiesArray: [action.payload.data, ...state.activitiesArray],
        teachingActivities: [action.payload.teachingActivity, ...state.teachingActivities],
        hospitalActivities: [action.payload.hospitalActivity, ...state.hospitalActivities],
        medicalSocieties: [action.payload.medicalSociety, ...state.medicalSocieties],
        jobs: [action.payload.job, ...state.jobs],
        fetching: false,
        status: 'success',
      };
    case CREATE_ACTIVITY_ERROR:
      return { ...state, fetching: false, error: action.payload, status: 'error' };
    /* Populate activities */
    case POPULATE_ACTIVITIES:
      return { ...state, fetching: true };
    case POPULATE_ACTIVITIES_SUCCES:
      return {
        ...state,
        activitiesArray: action.payload.array,
        teachingActivities: action.payload.teachingActivities,
        hospitalActivities: action.payload.hospitalActivities,
        medicalSocieties: action.payload.medicalSocieties,
        jobs: action.payload.jobs,
        fetching: false,
      };
    case POPULATE_ACTIVITIES_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}
