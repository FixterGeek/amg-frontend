/* eslint-disable object-curly-newline */
import { getPublications } from '../../services/userServices';
import { getSelfPublications, toPublish } from '../../services/publicationsServices';

const publicationState = {
  publications: [],
  selfArray: [],
  fetching: false,
  status: 'ok',
  adding: false,
};

// Constants

const POPULATE_PUBLICATIONS = 'POPULATE_PUBLICATIONS';
const POPULATE_PUBLICATIONS_SUCCESS = 'POPULATE_PUBLICATIONS_SUCCESS';
const POPULATE_PUBLICATIONS_ERROR = 'POPULATE_PUBLICATIONS_ERROR';

const SELF_PUBLICATIONS = 'SELF_PUBLICATIONS';
const SELF_PUBLICATIONS_SUCCESS = 'SELF_PUBLICATIONS_SUCCESS';
const SELF_PUBLICATIONS_ERROR = 'SELF_PUBLICATIONS_ERROR';

const CREATE_PUBLICATION = 'CREATE_PUBLICATION';
const CREATE_PUBLICATION_SUCCESS = 'CREATE_PUBLUCATION_SUCCESS';
const CREATE_PUBLICATION_ERROR = 'CREATE_PUBLICATION_ERROR';

// actionCreaors
// populate publications
export function populatePublications() {
  return { type: POPULATE_PUBLICATIONS };
}

export function populatePublicationsSuccess(payload) {
  return { type: POPULATE_PUBLICATIONS_SUCCESS, payload };
}

export function populatePublicationsError(payload) {
  return { type: POPULATE_PUBLICATIONS_ERROR, payload };
}

// sel publications
export function selfPublications() {
  return { type: SELF_PUBLICATIONS };
}

export function selfPublicationsSuccess(payload) {
  return { type: SELF_PUBLICATIONS_SUCCESS, payload };
}

export function selfPublicationsError(payload) {
  return { type: SELF_PUBLICATIONS_ERROR, payload }
}

// Create publication
export function createPublication() {
  return { type: CREATE_PUBLICATION };
}

export function createPublicationSuccess(publicationData) {
  return { type: CREATE_PUBLICATION_SUCCESS, payload: publicationData };
}

export function createPublicationError(error) {
  return { type: CREATE_PUBLICATION_ERROR, payload: error };
}


// Thunks
// Populate
export const populatePublicationsAction = () => (dispatch) => {
  dispatch(populatePublications());
  return getPublications()
    .then((data) => {
      dispatch(populatePublicationsSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populatePublicationsError(error));
      return error;
    });
};

// Self Publications
export const selfPublicationsAction = () => (dispatch) => {
  dispatch(selfPublications());
  return getSelfPublications()
    .then((data) => {
      dispatch(selfPublicationsSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(selfPublicationsError(error));
      return error;
    });
};

// Create publication
export const createPublicationAction = publicationData => (dispatch) => {
  dispatch(createPublication());
  return toPublish(publicationData)
    .then((data) => {
      dispatch(createPublicationSuccess(data));
    })
    .catch((error) => {
      if (error.response) dispatch(createPublicationError(error.response.data.message));
      else dispatch(createPublicationError(error));
    });
};


// reducer
function reducer(state = publicationState, action) {
  switch (action.type) {
    case POPULATE_PUBLICATIONS:
      return { ...state, fetching: true };
    case POPULATE_PUBLICATIONS_SUCCESS:
      return { ...state, publications: [...action.payload], fetching: false };
    case POPULATE_PUBLICATIONS_ERROR:
      return { ...state, fetching: false, error: true };
    /* Self publications */
    case SELF_PUBLICATIONS:
      return { ...state, fetching: true }
    case SELF_PUBLICATIONS_SUCCESS:
      return { ...state, selfArray: [...action.payload], fetching: false };
    case SELF_PUBLICATIONS_ERROR:
      return { ...state, fetching: false, error: true };
    /* Create publications */
    case CREATE_PUBLICATION:
      return { ...state, adding: true };
    case CREATE_PUBLICATION_SUCCESS:
      return {
        ...state,
        publications: [action.payload, ...state.publications],
        adding: false,
      };
    case CREATE_PUBLICATION_ERROR:
      return { ...state, adding: false, error: action.payload, status: 'error' };
    default:
      return state;
  }
}

export default reducer;
