/* eslint-disable nonblock-statement-body-position */
import { createEducation as create } from '../../services/educationsServices';

const educationState = {
  studies: [],
  internships: [],
  residences: [],
  fetching: false,
};


// Constants
const CREATE_EDUCATION = 'CREATE_EDUCATION';
const CREATE_EDUCATION_SUCCESS = 'CREATE_EDUCATION_SUCCES';
const CREATE_EDUCATION_ERROR = 'CREATE_EDUCATION_ERROR';

const POPULATE_EDUCATION = 'POPULATE_EDUCATION';
const POPULATE_EDUCATION_SUCCESS = 'POPULATE_EDUCATION_SUCCESS';
const POPULATE_EDUCATION_ERROR = 'POPULATE_EDUCATION_ERROR';


// Action creators
// Create education

export function createEducation() {
  return { type: CREATE_EDUCATION };
}

export function createEducationSuccess(educationData) {
  return { type: CREATE_EDUCATION_SUCCESS, payload: educationData };
}

export function createEducationError(error) {
  return { type: CREATE_EDUCATION_ERROR, payload: error };
}

// Populate education
export function populateEducation() {
  return { type: POPULATE_EDUCATION };
}

export function populateEducationSuccess(educationData) {
  return { type: POPULATE_EDUCATION_SUCCESS, payload: educationData };
}

export function populateEducationError(error) {
  return { type: POPULATE_EDUCATION_ERROR, payload: error };
}


// Thunks
// Create education

export const createEducationAction = (type, educationData) => (dispatch) => {
  dispatch(createEducation());
  return create(type, educationData)
    .then((data) => {
      dispatch(createEducationSuccess(data));
      return data;
    })
    .catch(({ response }) => {
      console.log(response)
      dispatch(createEducationError(response));
      return response;
    });
};

// Populate education
export const populateEducationAction = () => (dispatch) => {
  if (localStorage.education) dispatch(populateEducationSuccess(JSON.parse(localStorage.education)));
};


// Reducer
export default function reducer(state = educationState, action) {
  switch (action.type) {
    case CREATE_EDUCATION:
      return { ...state, fetching: true };
    case CREATE_EDUCATION_SUCCESS:
      const localEducation = localStorage.education ? JSON.parse(localStorage.education) : [];
      const {payload} = action
      let type = {};

      if (payload.educationType === 'studies')
        type = { ...state, fetching: false, studies: [payload, ...state.studies] };
      if (payload.educationType === 'residences')
        type = { ...state, fetching: false, residences: [payload, ...state.residences] };
      if (payload.educationType === 'internships')
        type = { ...state, fetching: false, internships: [payload, ...state.internships] };

      localStorage.education = JSON.stringify(type);
      return type;
    case CREATE_EDUCATION_ERROR:
      return { ...state, fetching: false, error: action.payload };
//
    case POPULATE_EDUCATION:
      return { ...state, fetching: true };
    case POPULATE_EDUCATION_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case POPULATE_EDUCATION_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}
