import {
  WRITE_USER,
  WRITE_USER_BASIC_DATA,
  CREATE_USER,
  WRITE_USER_ADDRESS,
} from './actions';

const userState = {
  name: '',
  dadSurName: '',
  momSurName: '',
  email: '',
  password: '',
  birthDate: '',
  basicData: {
    name: '',
    dadSurname: '',
    momSurname: '',
    address: {
      addressName: '',
    },
  },
  membershipStatus: '',
  placeOfBirth: {
    addressName: 'Pachuca',
    street: '',
    outdoorNumber: '',
    interiorNumber: '',
    colony: '',
    zipCode: '',
    city: 'Pachuca',
    state: 'Hidalgo',
    coordinates: ['123312', '123123']
  },
  speciality: '',
  userToken: '',
  phone: '',
  civilStatus: '',
  address: {
    addressName: '',
    street: '',
    outdoorNumber: '',
    interiorNumber: '',
    colony: '',
    zipCode: '',
    city: '',
    state: '',
    coordinates: ['123312', '123123']
  },
  spouse: {
    name: '',
    dadSurname: '',
    momSurname: '',
    email: '',
    phone: ''
  },
  studies: {
    user: '',
    major: '',
    institution: '',
    startDate: '',
    endDate: '',
    receptionDate: '',
    professionalLicence: ''
  },
  internships: {
    user: '',
    institution: '',
    startDate: '',
    endDate: ''
  },
  residences: {
    user: '',
    speciality: '',
    institution: '',
    startDate: '',
    endDate: '',
    specialityLicence: '',
    specialityLicenceCopy: '',
    specialistLicence: '',
    specialityDirectorsCertificates: ''
  },
  fiscalData: {
    rfc: '',
    phone: '',
    email: '',
    address: {
      addressName: '',
      street: '',
      outdoorNumber: '',
      interiorNumber: '',
      colony: '',
      zipCode: '',
      city: '',
      state: '',
      coordinates: ['123312', '123123']
    }
  }
};

function userReducer(state = userState, action) {
  switch (action.type) {
    case WRITE_USER:
      return { ...state, ...action.value };
    case WRITE_USER_BASIC_DATA:
      return { ...state, basicData: { ...state.basicData, ...action.value } };
    case WRITE_USER_ADDRESS:
      return {
        ...state,
        basicData: {
          ...state.basicData,
          address: {
            ...state.basicData.address,
            ...action.value,
          },
        },
      };
    case CREATE_USER:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export default userReducer;
