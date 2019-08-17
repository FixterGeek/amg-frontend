/* eslint-disable no-case-declarations */
import { createActivity as create, getActivitiesForUser } from '../../services/activitiesServices';

const activitiesState = {
  activitiesArray: [],
  newActivity: null,
  fetching: false,
};

const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
const CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR';

const POPULATE_ACTIVITIES = 'POPULATE_ACTIVITIES';
const POPULATE_ACTIVITIES_SUCCES = 'POPULATE_ACTIVITIES_SUCCESS';
const POPULATE_ACTIVITIES_ERROR = 'POPULATE_ACTIVITIES_ERROR';

// Actions creator
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
      dispatch(createActivitySuccess(data));
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

  if (localStorage.activities) dispatch(populateActivitiesSuccess(JSON.parse(localStorage.activities)));
  else {
    return getActivitiesForUser()
      .then((data) => {
        dispatch(populateActivitiesSuccess(data));
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
    case CREATE_ACTIVITY:
      return { ...state, fetching: true };
    case CREATE_ACTIVITY_SUCCESS:
      const localActivities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
      localStorage.activities = JSON.stringify([action.payload, ...localActivities]);
      return {
        ...state,
        activitiesArray: [action.payload, ...state.activitiesArray],
        fetching: false,
      };
    case CREATE_ACTIVITY_ERROR:
      return { ...state, fetching: false, error: action.payload };
//
    case POPULATE_ACTIVITIES:
      return { ...state, fetching: true };
    case POPULATE_ACTIVITIES_SUCCES:
      localStorage.activities = JSON.stringify(action.payload);
      return { ...state, activitiesArray: action.payload, fetching: false };
    case POPULATE_ACTIVITIES_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}
