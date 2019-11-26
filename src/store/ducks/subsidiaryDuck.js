import {
  postSubsidiary,
  getSubsidiaries,
  patchSubsidiary,
  deleteSubsidiary as ds,
} from '../../services/subsidiaryServices';
import { successAction, errorAction } from './tools';
import { uploadFile } from '../../tools/firebaseTools';

const prefix = 'SUBSIDIARY';

const working = {
  photoURL: null,
  businessName: null,
  state: null,
  payments: [],
  users: [],
  fiscalData: {
    rfc: null,
    phone: null,
    email: null,
    address: {
      type: 'Point',
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
  },
  bankData: {
    accountNumber: null,
    bank: null,
    CLABE: null,
  },
}

const initialState = {
  array: [],
  noData: false,
  fetching: false,
  status: null,
  workingOn: working,
}

/* Constants */
const RESET_SUBSIDIARY_STATUS = 'RESET_SUBSIDIARY_STATUS';
const WORKING_ON = `${prefix}/WORKING_ON`;
const SET_WORKING_ON = `${prefix}/SET_WORKING_ON`;
const RESET_WORKING_ON = `${prefix}/RESET_WORKING_ON`;

const FETCHING = `${prefix}/FETCHING`;
const FETCHING_ERROR = `${prefix}/ERROR`;

const CREATE_SUBSIDIARY_SUCCESS = `${prefix}/CREATE_SUBSIDIARY_SUCCESS`;
const UPDATE_SUBSIDIARY_SUCCESS = `${prefix}/UPDATE_SUBSIDIARY_SUCCESS`;
const POPULATE_SUBSIDIARIES_SUCCESS = `${prefix}/POPULATE_SUBSIDIARIES_SUCCESS`;
const DELETE_SUBSIDIARY_SUCCCES = `${prefix}/DELETE_SUBSIDIARY_SUCCCES`;


/* Actions */
const fetching = () => ({ type: FETCHING });
const fetchingError = () => ({ type: FETCHING_ERROR });


export const workingOn = (working, name, value) => {
  const levels = name.split('.');
  if (levels.length === 1) working[levels[0]] = value;
  if (levels.length === 2) working[levels[0]] = { ...working[levels[0]], [levels[1]]: value };
  if (levels.length === 3) working[levels[0]] = {
    ...working[levels[0]], [levels[1]]: { ...working[levels[0]][levels[1]], [levels[2]]: value }
  }
  if (levels.length === 4) working[levels[0]] = {
    ...working[levels[0]],
    [levels[1]]: {
      ...workingOn[levels[0]][levels[1]],
      [levels[2]]: {
        ...working[levels[0]][levels[1]][levels[2]],
        [levels[3]]: value,
      },
    },
  }
  return { type: WORKING_ON, payload: working };
};

export const setWorkingOn = (working) => ({ type: SET_WORKING_ON, payload: working });

export const resetWorkingOn = () => ({ type: RESET_WORKING_ON, payload: working });

// successes
const createSubsidiarySuccess = subsidiaryData => ({ type: CREATE_SUBSIDIARY_SUCCESS, payload: subsidiaryData });
const updateSubsidiarySuccess = updatedSubsidiary => ({ type: UPDATE_SUBSIDIARY_SUCCESS, payload: updatedSubsidiary });
const populateSubsidiariesSuccess = subsidiariesArray => ({ type: POPULATE_SUBSIDIARIES_SUCCESS ,payload: subsidiariesArray });
const deleteSubsidiarySuccess = deletedSubsidiary => ({ type: DELETE_SUBSIDIARY_SUCCCES, payload: deletedSubsidiary });


/* thunks */
// CREATE AND UPDATE
export const createOrUpdateSubsidiary = (subsidiaryData) => async (dispatch) => {
  dispatch(fetching());
  if (subsidiaryData.photoFile) {
    subsidiaryData.photoURL = await uploadFile(`/filiales/${subsidiaryData._id || 'generals'}/photos`, subsidiaryData.photoFile)
      .then(url => url);
  }
  if (!subsidiaryData._id) return postSubsidiary(subsidiaryData)
    .then((createdSubsidiary) => {
      return successAction(
        dispatch, createSubsidiarySuccess, createdSubsidiary, RESET_SUBSIDIARY_STATUS, `Filial de ${createdSubsidiary.state} creada`,
      );
    })
    .catch((error) => {
      return errorAction(dispatch, fetchingError, error, RESET_SUBSIDIARY_STATUS, 'No fue posible crear la Filial');
    });

  return patchSubsidiary(subsidiaryData._id, subsidiaryData)
    .then(updatedSubsidiary => successAction(
      dispatch, updateSubsidiarySuccess, updatedSubsidiary, RESET_SUBSIDIARY_STATUS, 'Filial actualizada',
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_SUBSIDIARY_STATUS, 'No fue posible actualizar la filial',
    ));
}

// POPULATE
export const populateSubsidiaries = () => (dispatch) => {
  dispatch(fetching());
  return getSubsidiaries()
    .then((subsidiariesArray) => {
      return successAction(
        dispatch, populateSubsidiariesSuccess, subsidiariesArray, RESET_SUBSIDIARY_STATUS, false
      );
    })
    .catch((error) => {
      return errorAction(
        dispatch, fetchingError, error, RESET_SUBSIDIARY_STATUS, 'Filiales no disponibles',
      );
    });
};

// delete
export const deletedSubsidiary = (subsidiaryData) => (dispatch) => {
  dispatch(fetching());
  return ds(subsidiaryData._id)
    .then(data => successAction(
      dispatch, deleteSubsidiarySuccess, data, RESET_SUBSIDIARY_STATUS, `Filial de ${subsidiaryData.state} eliminada`,
    ))
    .catch(error => errorAction(
      dispatch, fetchingError, error, RESET_SUBSIDIARY_STATUS, 'Error al emininar la filial'
    ));
}


/* reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    /* generics */
    case RESET_SUBSIDIARY_STATUS:
      return { ...state, fetching: false, status: null };
    case RESET_WORKING_ON:
      return { ...state, workingOn: action.payload };
    case FETCHING:
      return { ...state, fetching: true };
    case FETCHING_ERROR:
      return { ...state, status: 'error', error: action.payload };
    case WORKING_ON:
      return { ...state, workingOn: { ...action.payload } };
    case SET_WORKING_ON:
      return { ...state, workingOn: { ...action.payload } };
    /* spesisifcs */
    case CREATE_SUBSIDIARY_SUCCESS:
      return {
        ...state, status: 'success', array: [action.payload, ...state.array],
        noData: action.payload.length === 0,
      };
    case UPDATE_SUBSIDIARY_SUCCESS:
      return {
        ...state, status: 'success',
        array: state.array.map(s => s._id === action.payload._id ? action.payload : s),
      }
    case POPULATE_SUBSIDIARIES_SUCCESS:
      return { ...state, status: 'success', array: action.payload, noData: action.payload.length === 0 };
    case DELETE_SUBSIDIARY_SUCCCES:
      return { ...state, status: 'success', array: state.array.map(f => f._id === action.payload._id ? action.payload : f), };
    default:
      return state;
  }
}
