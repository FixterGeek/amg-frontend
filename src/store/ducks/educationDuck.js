/* eslint-disable no-param-reassign */
/* eslint-disable curly */
/* eslint-disable object-curly-newline */
/* eslint-disable nonblock-statement-body-position */
import { createEducation as create } from '../../services/educationsServices';
import { getSelfUser, getUser } from '../../services/userServices';
import { uploadFile } from '../../tools/firebaseTools';

const educationState = {
  studies: [],
  internships: [],
  residencies: [],
  fetching: false,
  status: null,
};


// Constants
const RESET_EDUCATION_STATUS = 'RESET_EDUCATION_STATUS';

const CREATE_EDUCATION = 'CREATE_EDUCATION';
const CREATE_EDUCATION_SUCCESS = 'CREATE_EDUCATION_SUCCES';
const CREATE_EDUCATION_ERROR = 'CREATE_EDUCATION_ERROR';

const POPULATE_EDUCATION = 'POPULATE_EDUCATION';
const POPULATE_EDUCATION_SUCCESS = 'POPULATE_EDUCATION_SUCCESS';
const POPULATE_EDUCATION_ERROR = 'POPULATE_EDUCATION_ERROR';


// Action creators
// Reset status
export function resetEducationStatus() {
  return { type: RESET_EDUCATION_STATUS };
}

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

export const createEducationAction = (type, educationData) => async (dispatch) => {
  dispatch(createEducation());
  const { user, titleFile, ceduleFile, certificateFile } = educationData;

  if (type === 'studies' || type === 'residences') {
    if (titleFile) await uploadFile(`users/${user}/docs`, titleFile)
      .then((url) => {
        educationData.cedulaURLS = [url];
        return url;
      });

    if (ceduleFile) await uploadFile(`users/${user}/docs`, ceduleFile)
      .then((url) => {
        educationData.tituloURLS = [url];
        return url;
      });
    if (certificateFile) await uploadFile(`users/${user}/docs`, certificateFile)
      .then((url) => {
        educationData.certificadoURLS = [url];
        return url;
      });
  }

  return create(type, educationData)
    .then((data) => {
      const localEducation = localStorage.education ? JSON.parse(localStorage.education) : {
        studies: [],
        internships: [],
        residencies: [],
      };
      let education = null;

      if (type === 'studies') education = { studies: [data, ...localEducation.studies] };
      if (type === 'residences') education = { residencies: [data, ...localEducation.residencies] };
      if (type === 'internships') education = { internships: [data, ...localEducation.internships] };

      localStorage.education = JSON.stringify({ ...localEducation, ...education });

      dispatch(createEducationSuccess(education));
      dispatch(resetEducationStatus());
      return data;
    })
    .catch(({ response }) => {
      dispatch(createEducationError(response));
      dispatch(resetEducationStatus());
      return response;
    });
};

// Populate education
export const populateEducationAction = (userId) => (dispatch) => {
  dispatch(populateEducation());
  if (localStorage.education && !userId) {
    const localEducation = JSON.parse(localStorage.education);

    dispatch(populateEducationSuccess({
      studies: localEducation.studies,
      internships: localEducation.internships,
      residencies: localEducation.residencies,
    }));
    dispatch(resetEducationStatus());
    return localEducation;
  }

  if (userId) return getUser(userId)
    .then((data) => {
      const { studies = [], residencies = [], internships = [] } = data;

      localStorage.education = JSON.stringify({ studies, residencies, internships });
      dispatch(populateEducationSuccess({ studies, residencies, internships }));
      dispatch(resetEducationStatus());
      return data;
    })
    .catch((error) => {
      dispatch(populateEducationError(error));
      dispatch(resetEducationStatus());
      return error;
    });

  return getSelfUser()
    .then((data) => {
      const { studies = [], residencies = [], internships = [] } = data;

      localStorage.education = JSON.stringify({ studies, residencies, internships });
      dispatch(populateEducationSuccess({ studies, residencies, internships }));
      dispatch(resetEducationStatus());
      return data;
    })
    .catch((error) => {
      dispatch(populateEducationError(error));
      dispatch(resetEducationStatus());
      return error;
    });
};


// Reducer
export default function reducer(state = educationState, action) {
  switch (action.type) {
    /* Reset status */
    case RESET_EDUCATION_STATUS:
      return { ...state, status: null };
    /* Create education */
    case CREATE_EDUCATION:
      return { ...state, fetching: true };
    case CREATE_EDUCATION_SUCCESS:
      return {
        ...state, fetching: false,
        status: 'success',
        ...action.payload
      };
    case CREATE_EDUCATION_ERROR:
      return { ...state, fetching: false, error: action.payload, status: 'error' };
    /* Populate education */
    case POPULATE_EDUCATION:
      return { ...state, fetching: true };
    case POPULATE_EDUCATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        status: 'success',
        studies: action.payload.studies,
        residencies: action.payload.residencies,
        internships: action.payload.internships,
      };
    case POPULATE_EDUCATION_ERROR:
      return { ...state, fetching: false, error: action.payload, status: 'error' };
    default:
      return state;
  }
}
