/* eslint-disable no-param-reassign */
import {
  getResources,
  createResource as newResource,
  deleteResource as removeResource,
  updateResource as patchResource,
} from '../../services/resourcesServices';
import { uploadFile } from '../../tools/firebaseTools';

const resourceState = {
  array: [],
  guides: [],
  publications: [],
  updated: null,
  fetching: false,
  status: null,
};

/* Constants */
// Reset status
const RESET_RESOURCE_STATUS = 'RESET_RESOURCE_STATUS';
// Populate resources
const POPULATE_RESOURCES = 'POPULATE_RESOURCES';
const POPULATE_RESOURCES_SUCCESS = 'POPULATE_RESOURCES_SUCCESS';
const POPULATE_RESOURCES_ERROR = 'POPULATE_RESOURCES_ERROR';

// Create resource
const CREATE_RESOURCE = 'CREATE_RESOURCE';
const CREATE_RESOURCE_SUCCESS = 'CREATE_RESOURCE_SUCCESS';
const CREATE_RESOURCE_ERROR = 'CREATE_RESOURCE_ERROR';

// Delete resource
const DELETE_RESOURCE = 'DELETE_RESOURCE';
const DELETE_RESOURCE_SUCCESS = 'DELETE_RESOURCE_SUCCESS';
const DELETE_RESOURCE_ERROR = 'DELETE_RESOURCE_ERROR';

// Update resource
const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
const UPDATE_RESOURCE_SUCCESS = 'UPDATE_RESOURCE_SUCCESS';
const UPDATE_RESOURCE_ERROR = 'UPDATE_RESOURCE_ERROR';


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

// Delete resource
export function deleteResource() {
  return { type: DELETE_RESOURCE };
}

export function deleteResourceSuccess(resourceData) {
  return { type: DELETE_RESOURCE_SUCCESS, payload: resourceData };
}

export function deleteResourceError(error) {
  return { type: DELETE_RESOURCE_ERROR, payload: error };
}

// Update resource
export function updateResource() {
  return { type: UPDATE_RESOURCE };
}

export function updateResourceSuccess(resourceData) {
  return { type: UPDATE_RESOURCE_SUCCESS, payload: resourceData };
}

export function updateResourceError(error) {
  return { type: UPDATE_RESOURCE_ERROR, payload: error };
}


/* Thunks */
// Populate resources
export const populateResourcesAction = () => (dispatch) => {
  dispatch(populateResources());
  return getResources()
    .then((data) => {
      const guides = data.filter(resource => resource.tipo === 'Guías y consensos');
      const publications = data.filter(resource => resource.tipo === 'Publicaciones');
      dispatch(populateResourcesSuccess({ array: data, guides, publications }));
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

// Delete resource
export const deleteResourceAction = resourceId => (dispatch) => {
  dispatch(deleteResource());
  return removeResource(resourceId)
    .then((data) => {
      dispatch(deleteResourceSuccess({ array: data, id: resourceId }));
      return data;
    })
    .catch((error) => {
      dispatch(deleteResourceError(error));
      return error;
    });
};

// Update resource
export const updateResourceAction = (resourceId, resourceData) => async (dispatch) => {
  dispatch(updateResource());

  if (resourceData.preview) {
    resourceData.url = await uploadFile('resources/covers', resourceData.preview).then(url => url);
  }
  if (resourceData.document) {
    resourceData.docsURLS[0] = await uploadFile('', resourceData.document).then(url => url);
  }
  return patchResource(resourceId, resourceData)
    .then((data) => {
      dispatch(updateResourceSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(updateResourceError(error));
      return error;
    });
};


/* Reducer */
export default function reducer(state = resourceState, action) {
  switch (action.type) {
    /* Reset status */
    case RESET_RESOURCE_STATUS:
      return { ...state, status: null, updated: null };
    /* Populate resources */
    case POPULATE_RESOURCES:
      return {...state, fetching: true };
    case POPULATE_RESOURCES_SUCCESS:
      return {
        ...state,
        fetching: false,
        status: 'success',
        array: action.payload.array,
        guides: action.payload.guides,
        publications: action.payload.publications,
      };
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
    /* Delete resource */
    case DELETE_RESOURCE:
      return { ...state, fetching: true };
    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        fetching: false,
        status: 'success',
        array: [...state.array.filter(rsc => rsc._id !== action.payload.id)],
        guides: [
          ...state.array.filter(
            rsc => (rsc._id !== action.payload.id && rsc.tipo === 'Guías y consensos'),
          ),
        ],
        publications: [
          ...state.array.filter(
            rsc => (rsc._id !== action.payload.id && rsc.tipo === 'Publicaciones'),
          ),
        ],
      };
    case DELETE_RESOURCE_ERROR:
      return { ...state, fetching: false, status: 'error' };
    /* Update resource */
    case UPDATE_RESOURCE:
      return { ...state, fetching: true };
    case UPDATE_RESOURCE_SUCCESS:
      return { ...state, fetching: false, updated: action.payload, status: 'success' };
    case UPDATE_RESOURCE_ERROR:
      return { ...state, fetching: false, error: action.payload, status: 'error' };
    default:
      return state;
  }
}
