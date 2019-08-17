import { signup } from '../../services/userServices';

const signupState = {
  email: null,
  password: null,
  basicData: {
    name: null,
    dadSurname: null,
    momSurname: null,
    birthDate: null,
    placeOfBirth: {
      addressName: null,
      state: null,
    },
    speciality: null,
  },
  fiscalData: {
    address: {},
  },
  membershipStatus: 'Free',
  status: 'ide', // success || error || fetching
  studies: [],
  interships: [],
  newStudy: {},
  newIntership: {},
  newInstitution: {
    location: {},
  },
  newOwnInstitution: {
    type: 'Consultorio',
    location: {},
  },
};

// 1.- recolectamos info de 1
//2.- post de eso al endpoint correcto
//3.- con la respuesta hacemos push al array del reducer


const WRITE_SIGNUP = 'WRITE_SIGNUP';
const WRITE_BASIC_DATA = 'WRITE_BASIC_DATA';
const WRITE_PLACE_OF_BIRD = 'WRITE_PLACE_OF_BIRD';

const SIGNUP_USER = 'SIGNUP_USER';
const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';

const WRITE_NEW_STUDY = 'WRITE_NEW_STUDY';
const WRITE_NEW_INTERSHIP = 'WRITE_NEW_INTERSHIP';
const WRITE_NEW_INSTITUTION = 'WRITE_NEW_INSTITUTION';
const WRITE_NEW_OWN_INSTITUTION = 'WRITE_NEW_OWN_INSTITUTION';
const WRITE_NEW_FISCAL_DATA = 'WRITE_NEW_FISCAL_DATA';


export function writeNewFiscalData(data) {
  return { type: WRITE_NEW_FISCAL_DATA, payload: data };
}

export function writeNewInstitution(data) {
  return { type: WRITE_NEW_INSTITUTION, payload: data };
}

export function writeNewOwnInstitution(data) {
  return { type: WRITE_NEW_OWN_INSTITUTION, payload: data };
}

export function writeNewStudy(data) {
  return { type: WRITE_NEW_STUDY, payload: data };
}

export function writeNewIntership(data) {
  return { type: WRITE_NEW_INTERSHIP, payload: data };
}

export function writeSignup(payload) {
  return { type: WRITE_SIGNUP, payload };
}

export function writeBasicData(payload) {
  return { type: WRITE_BASIC_DATA, payload };
}

export function writePlaceOfBird(payload) {
  return { type: WRITE_PLACE_OF_BIRD, payload };
}

export const writeSignupAction = payload => (dispatch) => {
  return dispatch(writeSignup(payload));
};

export const writeBasicDataAction = payload => (dispatch) => {
  return dispatch(writeBasicData(payload));
};

export const writePlaceOfBirdAction = payload => (dispatch) => {
  return dispatch(writePlaceOfBird(payload));
};


export function signUpUser() {
  return { type: SIGNUP_USER };
}

export function signUpUserSuccess(data) {
  return { type: SIGNUP_USER_SUCCESS, payload: data };
}

export function signUpUserError(error) {
  return { type: SIGNUP_USER_ERROR, payload: error };
}


export const signupUserAction = userData => (dispatch) => {
  dispatch(signUpUser());
  return signup(userData)
    .then((data) => {
      localStorage.user = JSON.stringify(data.user);
      localStorage.authToken = data.token;
      dispatch(signUpUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(signUpUserError(error.response.data.message));
      return error;
    });
};


function reducer(state = signupState, action) {
  switch (action.type) {
    case 'LOOK_FOR_SAVED_DATA':
      const signup = localStorage.user;
      if (signup) return { ...JSON.parse(signup) };
      else return state;
    case WRITE_NEW_FISCAL_DATA:
      return { ...state, fiscalData: { ...state.fiscalData, ...action.payload } };
    case WRITE_NEW_INSTITUTION:
      return { ...state, newInstitution: { ...state.newInstitution, ...action.payload } };
    case WRITE_NEW_OWN_INSTITUTION:
      return { ...state, newOwnInstitution: { ...state.newOwnInstitution, ...action.payload } };
    case WRITE_NEW_INTERSHIP:
      return { ...state, newIntership: { ...action.payload } };
    case WRITE_NEW_STUDY:
      return { ...state, newStudy: { ...action.payload } };
    case WRITE_SIGNUP:
      return { ...state, ...action.payload };
    case WRITE_BASIC_DATA:
      return { ...state, basicData: { ...state.basicData, ...action.payload } };
    case WRITE_PLACE_OF_BIRD:
      return {
        ...state,
        basicData: {
          ...state.basicData,
          placeOfBirth: { ...state.basicData.placeOfBirth, ...action.payload },
        },
      };
    case SIGNUP_USER:
      return { ...state, fetching: true, status: 'fetching' };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...action.payload, fetching: false, status: 'success' };
    case SIGNUP_USER_ERROR:
      return { ...state, fetching: false, error: action.payload, status: 'error' };
    default:
      return state;
  }
}

export default reducer;
