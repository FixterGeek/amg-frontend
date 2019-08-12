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
      street: null,
      outdoorNumber: null,
      interiorNumber: null,
      colony: null,
      zipCode: null,
      city: null,
      state: null,
      coordinates: [],
    },
    speciality: null,
    photoURL: null,
    phone: null,
    civilStatus: null,
    adress: {},
  },
  spouse: {},
  fiscalData: {},
  registrationDate: null,
  userStatus: null,
  revisonDate: null,
  reviwedBy: null,
  membersWhoRecommend: [],
  membershipStatus: 'Free',
  workedAtInstitutions: [],
  consultories: [],
  studies: [],
  interships: [],
  residencies: [],
  teachingActivities: [],
  medicalSocieties: [],
  fetching: false,
};


const WRITE_SIGNUP = 'WRITE_SIGNUP';
const WRITE_BASIC_DATA = 'WRITE_BASIC_DATA';
const WRITE_PLACE_OF_BIRD = 'WRITE_PLACE_OF_BIRD';

const SIGNUP_USER = 'SIGNUP_USER';
const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';


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

export function signUpUserSuccess(payload) {
  return { type: SIGNUP_USER_SUCCESS, payload };
}

export function signUpUserError(payload) {
  return { type: SIGNUP_USER_ERROR, payload };
}


export const signupUserAction = userData => (dispatch) => {
  console.log(userData);
  dispatch(signUpUser());
  return signup(userData)
    .then((data) => {
      dispatch(signUpUserSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(signUpUserError(error));
      return error;
    });
};


function writeReducer(state = signupState, action) {
  console.log(action.payload);
  switch (action.type) {
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
      return { ...state, fetching: true };
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...action.payload, fetching: false };
    case SIGNUP_USER_ERROR:
      return { ...state, fetching: false, error: true };
    default:
      return state;
  }
}

export default writeReducer;
