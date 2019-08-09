import { login, getSelfUser } from '../../services/Services';

// inital data
const userState = {
  email: null,
  basicData: {
    name: null,
    darSurname: null,
    momSurname: null,
    birthDate: null,
    placeOfBirth: {},
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
  workedAtInstitutions: [],
  consultories: [],
  studies: [],
  interships: [],
  residencies: [],
  teachingActivities: [],
  medicalSocieties: [],
  createdAt: null,
  updatedAt: null,
  _id: null,
  fetching: false,
  isLogged: false,
};


// Constants
const POPULATE_USER_SUCCESS = 'POPULATE_USER_SUCCESS';
const POPULATE_USER = 'POPULATE_USER';
const POPULATE_USER_ERROR = 'POPULATE_USER_ERROR';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

// actionCreators
export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}
export function loginUserError(payload) {
  return {
    type: LOGIN_USER_ERROR,
    payload,
  };
}
export function loginUserSuccess(payload) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload,
  };
}

export function populateUser() {
  return {
    type: POPULATE_USER,
  };
}
export function populateUserError(payload) {
  return {
    type: POPULATE_USER_ERROR,
    payload,
  };
}
export function populateUserSuccess(payload) {
  return {
    type: POPULATE_USER_SUCCESS,
    payload,
  };
}

// thunks
// login
export const loginUserAction = auth => (dispatch) => {
  dispatch(loginUser());
  return login(auth)
    .then((data) => {
      dispatch(loginUserSuccess(data.user));
      localStorage.authToken = data.token;
      return data;
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginUserError(err));
    });
};


// populate
export const populateUserAction = () => (dispatch) => {
  dispatch(populateUser());
  return getSelfUser()
    .then((data) => {
      dispatch(populateUserSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populateUserError(error));
      return error;
    });
};


// reducer
function reducer(state = userState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...action.payload, fetching: false, isLogged: true };
    case LOGIN_USER_ERROR:
      return { ...userState, fetching: false, error: JSON.stringify(action.payload) };
    case LOGIN_USER:
      return { ...userState, fetching: true };
    case POPULATE_USER:
      return { ...userState, fetching: true };
    case POPULATE_USER_SUCCESS:
      return { ...action.payload, fetching: false };
    case POPULATE_USER_ERROR:
      return { ...userState, fetching: false, error: true };
    default:
      return state;
  }
}


// exportacion
export default reducer;
