import { WRITE_USER, CREATE_USER } from './actions';

const userState = {
  name: '',
  dadSurName: '',
  momSurName: '',
  email: '',
  password: '',
  birthDate: '',
  basicData: {},
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
    case CREATE_USER:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export default userReducer;
