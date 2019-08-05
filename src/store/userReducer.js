import { WRITE_USER, CREATE_USER, UPDATE_USER, SHOW_USERS } from "./actions";

const userState = {
  email: "",
  password: "",
  userToken: "",
  basicData: {
    name: "",
    dadSurname: "",
    momSurname: "",
    speciality: "",
    phone: "",
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
    },
    photoURL: ""
  },
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
    institution: {
      name: "",
      president: "",
      type: ["Hospital", "Escuela", "Consultorio", "Sociedad"],
      location: {
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
      phones: [124123412341234, 123412341234],
      email: "",
      logoURL: ""
    },
    startDate: "",
    endDate: ""
  },
  consultories: {
    institution: {
      name: "",
      president: "",
      type: ["Hospital", "Escuela", "Consultorio", "Sociedad"],
      location: {
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
      phones: [124123412341234, 123412341234],
      email: "",
      logoURL: ""
    },
    startDate: "",
    endDate: ""
  }
};

function userReducer(state = userState, action) {
  switch (action.type) {
    case WRITE_USER:
      return { ...state, ...action.value };
    case CREATE_USER:
      return { ...state, ...action.value };
    case UPDATE_USER:
      return { ...state, ...action.value };
    case SHOW_USERS:
      return { ...state, ...action.value };
    default:
      return state;
  }
}

export default userReducer;
