import { getPublications } from '../../services/Services';

const publicationState = {
  publications: [],
  fetching: false,
};

// Constants

const POPULATE_PUBLICATIONS = 'POPULATE_PUBLICATIONS';
const POPULATE_PUBLICATIONS_SUCCESS = 'POPULATE_PUBLICATIONS_SUCCESS';
const POPULATE_PUBLICATIONS_ERROR = 'POPULATE_PUBLICATIONS_ERROR';

// actionCreaors
export function populatePublications() {
  return { type: POPULATE_PUBLICATIONS };
}

export function populatePublicationsSuccess(payload) {
  return { type: POPULATE_PUBLICATIONS_SUCCESS, payload };
}

export function populatePublicationsError(payload) {
  return { type: POPULATE_PUBLICATIONS_ERROR, payload };
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


// reducer
function reducer(state = publicationState, action) {
  switch (action.type) {
    case POPULATE_PUBLICATIONS:
      return { ...publicationState, fetching: true };
    case POPULATE_PUBLICATIONS_SUCCESS:
      return { ...publicationState, publications: [...action.payload], fetching: false };
    case POPULATE_PUBLICATIONS_ERROR:
      return { ...publicationState, fetching: false, error: true };
    default:
      return state;
  }
}

export default reducer;
