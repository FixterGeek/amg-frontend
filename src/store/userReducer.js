import { WRITE_USER, CREATE_USER } from "./actions";

const userState = {
  email: "",
  password: "",
  basicData: {
    name: "",
    dadSurname: "",
    momSurname: "",
    birthDate: "",
    placeOfBirth: {
      addressName: "",
      street: "",
      outdoorNumber: "",
      interiorNumber: "",
      colony: "",
      zipCode: "",
      city: "",
      state: "",
      coordinates: ["123312", "123123"]
    }
  },
  speciality: "",
  photoURL: "",
  userToken: "",
  phone: "",
  civilStatus: ["Soltero", "Casado", "Divorciado", "Unión Libre", "Viudo"],
  address: {
    addressName: "",
    street: "",
    outdoorNumber: "",
    interiorNumber: "",
    colony: "",
    zipCode: "",
    city: "",
    state: "",
    coordinates: ["123312", "123123"]
  },
  spouse: {
    name: "",
    dadSurname: "",
    momSurname: "",
    email: "",
    phone: ""
  },
  studies: {
    major: "",
    institution: "",
    startDate: "",
    endDate: "",
    receptionDate: "",
    professionalLicence: ""
  },
  internships: {
    institution: "",
    startDate: "",
    endDate: ""
  },
  residencies: {
    speciality: "",
    institution: "",
    startDate: "",
    endDate: "",
    specialityLicence: "",
    specialityLicenceCopy: "",
    specialistLicence: "",
    specialityDirectorsCertificates: ""
  },
  fiscalData: {
    rfc: "",
    phone: "",
    email: "",
    address: {
      addressName: "",
      street: "",
      outdoorNumber: "",
      interiorNumber: "",
      colony: "",
      zipCode: "",
      city: "",
      state: "",
      coordinates: ["123312", "123123"]
    }
  },
  registrationDate: "",
  membershipStatus: ["Pendiente de Pago", "Pagado", "Veterano"],
  userStatus: ["Registrado", "Pendiente", "Aprobado", "No Aprobado"],
  revisionDate: "",
  reviwedBy: "",
  membersWhoRecommend: [],
  workedAtInstitutions: {
    institution: "",
    startDate: "",
    endDate: ""
  },
  consultories: []
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
