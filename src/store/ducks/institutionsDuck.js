import { getAllInstitutions } from '../../services/institutionsServices';

const institutionsState = {
  institutionsArray: [],
  fetching: false,
};

const POPULATE_INSTITUTIONS = 'POPULATE_INSTITUTIONS';
const POPULATE_INSTITUTIONS_SUCCESS = 'POPULATE_INSTITUTIONS_SUCCESS';
const POPULATE_INSTITUTIONS_ERROR = 'POPULATE_INSTITUTIONS_ERROR';

const PUSH_LAST_INSTITUTION = 'PUSH_NEW_INSTITUTION';


// Actions creators
// Populate
export function populateInstitutions() {
  return { type: POPULATE_INSTITUTIONS };
}

export function populateInstitutionsSuccess(institutionsArray) {
  return { type: POPULATE_INSTITUTIONS_SUCCESS, payload: institutionsArray };
}

export function populateInstitutionsError(error) {
  return { type: POPULATE_INSTITUTIONS_ERROR, payload: error };
}


// Push new institution
export function pushLastInstitution(institution) {
  return { type: PUSH_LAST_INSTITUTION, payload: institution };
}


// Thunks
// Populate
export const populateInstitutionsAction = () => (dispatch) => {
  dispatch(populateInstitutions());
  return getAllInstitutions()
    .then((data) => {
      dispatch(populateInstitutionsSuccess(data));
      return data;
    })
    .catch(({ response }) => {
      dispatch(populateInstitutionsError(response.data.message));
      return response;
    });
};


export default function reducer(state = institutionsState, action) {
  switch (action.type) {
    case POPULATE_INSTITUTIONS:
      return { ...state, fetching: true };
    case POPULATE_INSTITUTIONS_SUCCESS:
      return { ...state, institutionsArray: action.payload, fetching: false };
    case POPULATE_INSTITUTIONS_ERROR:
      return { ...state, fetching: false, error: action.payload };
//
    case PUSH_LAST_INSTITUTION:
      return { ...state, institutionsArray: [action.payload, ...state.institutionsArray] };
    default:
      return state;
  }
}