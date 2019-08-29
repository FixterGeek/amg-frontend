/* eslint-disable no-param-reassign */
import {
  getResources,
  createResource as newResource,
} from '../../services/resourcesServices';
import { uploadFile } from '../../tools/firebaseTools';

const resourceState = {
  guides: [],
  publications: [],
  fetching: false,
  status: null,
};

/* Constants */
// Reset status
const RESET_RESOURCE_STATUS = 'CREATE_RESOURCE_STATUS';
// Populate resources
const POPULATE_RESOURCES = 'POPULATE_RESOURCES';
const POPULATE_RESOURCES_SUCCESS = 'POPULATE_RESOURCES_SUCCESS';
const POPULATE_RESOURCES_ERROR = 'POPULATE_RESOURCES_ERROR';

// Create resource
const CREATE_RESOURCE = 'CREATE_RESOURCE';
const CREATE_RESOURCE_SUCCESS = 'CREATE_RESOURCE_SUCCESS';
const CREATE_RESOURCE_ERROR = 'CREATE_RESOURCE_ERROR';


/* Action creators */
// Reset status
export function resetStatus() {
  return { type: RESET_RESOURCE_STATUS };
}

// Populate resources
export function populateResources() {
  return { type: POPULATE_RESOURCES };
}

export function populateResourcesSuccess(resourcesArray) {
  return { type: POPULATE_RESOURCES_SUCCESS, payload: resourcesArray };
}

export function populateResourcesError(error) {
  return { type: POPULATE_RESOURCES_ERROR, payload: error };
}

// Create resource
export function createResource() {
  return { type: CREATE_RESOURCE };
}

export function createResourceSuccess(resourceData) {
  return { type: CREATE_RESOURCE_SUCCESS, payload: resourceData };
}

export function createResourceError(error) {
  return { type: CREATE_RESOURCE_ERROR, payload: error };
}


/* Thunks */
// Populate resources
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

// Create resource
export const createResourceAction = resourceData => (dispatch) => {
  dispatch(createResource());
  const { preview, document } = resourceData;
  uploadFile('resources/covers', preview)
    .then((url) => {
      resourceData.url = url;
      return uploadFile('resources/documents', document);
    })
    .then((url) => {
      resourceData.docsURLS = [url];
      return newResource(resourceData);
    })
    .then((data) => {
      dispatch(createResourceSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(createResourceError(error));
      return error;
    });
};


/* Reducer */
export default function reducer(state = resourceState, action) {
  switch (action.type) {
    /* Reset status */
    case RESET_RESOURCE_STATUS:
      return { ...state, status: null };
    /* Populate resources */
    case POPULATE_RESOURCES:
      return {...state, fetching: true };
    case POPULATE_RESOURCES_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case POPULATE_RESOURCES_ERROR:
      return {
        ...state, fetching: false, status: 'error', error: action.payload,
      };
    /* Create resources */
    case CREATE_RESOURCE:
      return { ...state, fetching: true };
    case CREATE_RESOURCE_SUCCESS:
      return { ...state, fetching: false, status: 'success' };
    case CREATE_RESOURCE_ERROR:
      return { ...state, fetching: false, status: 'error', error: action.payload };
    default:
      return state;
  }
}
