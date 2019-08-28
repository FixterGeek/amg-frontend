import { getResources } from '../../services/resourcesServices';

const resourceState = {
  guides: [],
  publications: [],
  fetching: false,
  status: null,
};

/* Constants */
const POPULATE_RESOURCES = 'POPULATE_RESOURCES';
const POPULATE_RESOURCES_SUCCESS = 'POPULATE_RESOURCES_SUCCESS';
const POPULATE_RESOURCES_ERROR = 'POPULATE_RESOURCES_ERROR';


/* Action creators */
export function populateResources() {
  return { type: POPULATE_RESOURCES };
}

export function populateResourcesSuccess(resourcesArray) {
  return { type: POPULATE_RESOURCES_SUCCESS, payload: resourcesArray };
}

export function populateResourcesError(error) {
  return { type: POPULATE_RESOURCES_ERROR, payload: error };
}


/* Thunks */
export const populateResourcesAction = () => (dispatch) => {
  dispatch(populateResources());
  return getResources()
    .then((data) => {
      dispatch(populateResourcesSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(populateResourcesError(error));
      return error;
    });
};


/* Reducer */
export default function reducer(state = resourceState, action) {
  switch (action.type) {
    case POPULATE_RESOURCES:
      return {...state, fetching: true };
    case POPULATE_RESOURCES_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case POPULATE_RESOURCES_ERROR:
      return {
        ...state, fetching: false, status: 'error', error: action.payload,
      };
    default:
      return state;
  }
}
