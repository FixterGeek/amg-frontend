const signupState = {
  email: null,
  password: null,
  basicData: {
    name: null,
    dadSurname: null,
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
  fetching: false,
  isLogged: false,
};


const WRITE_SIGNUP = 'WRITE_SIGNUP';
const WRITE_BASIC_DATA = 'WRITE_BASIC_DATA';


export function writeSignup(payload) {
  return { type: WRITE_SIGNUP, payload };
}

export function writeBasicData(payload) {
  return { type: WRITE_BASIC_DATA, payload };
}


export const writeSignupAction = payload => (dispatch) => {
  return dispatch(writeSignup(payload));
};

export const writeBasicDataAction = payload => (dispatch) => {
  return dispatch(writeBasicData(payload));
};


function writeReducer(state = signupState, action) {
  console.log(action.payload);
  switch (action.type) {
    case WRITE_SIGNUP:
      return { ...state, ...action.payload };
    case WRITE_BASIC_DATA:
      return { ...state, basicData: { ...state.basicData, ...action.payload } };
    default:
      return state;
  }
}

export default writeReducer;
